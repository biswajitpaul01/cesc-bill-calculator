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

  if (meterType === DOMESTIC_TYPE) {
    while (unit > 0) {
      if (unit > 300) {
        slabRates.push((unit - 300) * CescSlabRatesResidential[5].rate);
        unit = 300;
      } else if (unit > 150) {
        slabRates.push((unit - 150) * CescSlabRatesResidential[4].rate);
        unit = 150;
      } else if (unit > 100) {
        slabRates.push((unit - 100) * CescSlabRatesResidential[3].rate);
        unit = 100;
      } else if (unit > 60) {
        slabRates.push((unit - 60) * CescSlabRatesResidential[2].rate);
        unit = 60;
      } else if (unit > 25) {
        slabRates.push((unit - 25) * CescSlabRatesResidential[1].rate);
        unit = 25;
      } else {
        slabRates.push(unit * CescSlabRatesResidential[0].rate);
        unit = 0;
      }
    }
  } else if (meterType === COMMERCIAL_TYPE) {
    while (unit > 0) {
      if (unit > 300) {
        slabRates.push((unit - 300) * CescSlabRatesCommertial[4].rate);
        unit = 300;
      } else if (unit > 150) {
        slabRates.push((unit - 150) * CescSlabRatesCommertial[3].rate);
        unit = 150;
      } else if (unit > 100) {
        slabRates.push((unit - 100) * CescSlabRatesCommertial[2].rate);
        unit = 100;
      } else if (unit > 60) {
        slabRates.push((unit - 60) * CescSlabRatesCommertial[1].rate);
        unit = 60;
      } else {
        slabRates.push(unit * CescSlabRatesCommertial[0].rate);
        unit = 0;
      }
    }
  }

  bill = slabRates.reverse();
  totalBill = bill.reduce((a, b) => a + b, 0);
  rebate = totalBill * 0.01 + fixedCharge * 0.01;

  if (meterType === DOMESTIC_TYPE && initialUnit > 150) {
    govDuty = (totalBill + mvca + fixedCharge - rebate) * 0.1;
  }

  if (meterType === COMMERCIAL_TYPE && initialUnit > 300) {
    govDuty = (totalBill + mvca + fixedCharge - rebate) * 0.125;
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
