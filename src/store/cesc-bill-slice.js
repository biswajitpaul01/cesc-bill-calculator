import { createSlice } from "@reduxjs/toolkit";
import { DOMESTIC_TYPE } from "../config/constants";
import { calculateCescBill } from "../helpers/calculations/CescBillCalculation";

const initialState = {
  fields: {
    meterType: DOMESTIC_TYPE,
    unit: 0,
  },
  errors: {},
  bill: [],
  energyCharges: 0,
  mvca: 0,
  fixedCharge: 0,
  govDuty: 0,
  meterRent: 0,
  grossAmount: 0,
  rebate: 0,
  finalBill: 0,
};

export const cescBillSlice = createSlice({
  name: "cescBill",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { field, value } = action.payload;
      state.fields[field] = field === "meterType" ? value : parseInt(value);
      state.energyCharges = 0;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    calculateBill: (state) => {
      const { meterType, unit } = state.fields;
      const { bill, totalBill, mvca, fixedCharge, govDuty, meterRent, rebate } =
        calculateCescBill({ meterType, unit });

      state.bill = bill;
      state.energyCharges = totalBill;
      state.mvca = mvca;
      state.fixedCharge = fixedCharge;
      state.govDuty = govDuty;
      state.meterRent = meterRent;
      state.rebate = rebate;
      state.grossAmount = totalBill + fixedCharge + mvca + govDuty + meterRent;
      state.finalBill = state.grossAmount - rebate;
    },
  },
});

export const cescBillActions = cescBillSlice.actions;
