import { configureStore } from "@reduxjs/toolkit";
import { cescBillSlice } from "./cesc-bill-slice";

export const store = configureStore({
  reducer: {
    cescBill: cescBillSlice.reducer,
  },
});
