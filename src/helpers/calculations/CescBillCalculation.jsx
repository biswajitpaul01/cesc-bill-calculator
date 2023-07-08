import {
  CescSlabRatesCommertial,
  CescSlabRatesResidential,
} from "../../config/CescConfig";
import { COMMERCIAL_TYPE, DOMESTIC_TYPE } from "../../config/constants";

export const calculateCescBill = ({ meterType, unit }) => {
  const initialUnit = unit;
  const meterRent = meterType === DOMESTIC_TYPE ? 10 : 15;
  const fixedCharge = meterType === DOMESTIC_TYPE ? 16.5 : 24;
  const mvca = 0;
  let govDuty = 0;
  let bill = 0;
  let totalBill = 0;
  let rebate = 0;
  let slabRates = [];
  const slabs =
    meterType === DOMESTIC_TYPE
      ? structuredClone(CescSlabRatesResidential)
      : structuredClone(CescSlabRatesCommertial);

  slabs
    .filter(
      (slab, index) =>
        !index ||
        (unit > slabs[index - 1].max && unit <= slabs[index].max) ||
        unit > slab.max
    )
    .reverse()
    .reduce((accumulator, currentValue) => {
      const index = Math.max(currentValue.id - 1, 0);
      const max = Math.min(slabs[index - 1]?.max, 300) || 0;

      slabRates.push((accumulator - max) * currentValue.rate);
      return max;
    }, unit);

  bill = slabRates.reverse();
  totalBill = bill.reduce((a, b) => a + b, 0);
  rebate = totalBill * 0.01 + fixedCharge * 0.01;

  if (meterType === DOMESTIC_TYPE && initialUnit > 300) {
    govDuty = (totalBill + mvca + fixedCharge - rebate) * 0.1;
  } else if (meterType === COMMERCIAL_TYPE && initialUnit > 150) {
    const percentage = initialUnit > 1000 ? 0.15 : 0.125;
    govDuty = (totalBill + mvca + fixedCharge - rebate) * percentage;
  }

  return {
    bill,
    totalBill,
    mvca,
    fixedCharge,
    govDuty,
    meterRent,
    rebate,
  };
};
