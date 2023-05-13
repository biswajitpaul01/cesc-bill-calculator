import { CescSlabRates } from "../../config/CescConfig";

export const calculateCescBill = (unit) => {
  const initialUnit = unit;
  const mvca = 0;
  const fixedCharge = 16.5;
  const govDuty = 0;
  const meterRent = 10;
  let bill = 0;
  let totalBill = 0;
  let rebate = 0;
  let slabRates = [];

  while (unit > 0) {
    if (unit > 300) {
      slabRates.push((unit - 300) * CescSlabRates[5].rate);
      unit = 300;
    } else if (unit > 150) {
      slabRates.push((unit - 150) * CescSlabRates[4].rate);
      unit = 150;
    } else if (unit > 100) {
      slabRates.push((unit - 100) * CescSlabRates[3].rate);
      unit = 100;
    } else if (unit > 60) {
      slabRates.push((unit - 60) * CescSlabRates[2].rate);
      unit = 60;
    } else if (unit > 25) {
      slabRates.push((unit - 25) * CescSlabRates[1].rate);
      unit = 25;
    } else {
      slabRates.push(unit * CescSlabRates[0].rate);
      unit = 0;
    }
  }

  bill = slabRates.reverse();
  totalBill = bill.reduce((a, b) => a + b, 0);
  rebate = totalBill * 0.01 + fixedCharge * 0.01;

  return {
    initialUnit,
    bill,
    totalBill,
    mvca,
    fixedCharge,
    govDuty,
    meterRent,
    rebate,
  };
};
