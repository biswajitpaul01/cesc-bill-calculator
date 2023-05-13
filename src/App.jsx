import { useFormik } from "formik";
import { useState } from "react";
import "./App.scss";
import { CescBillSplit } from "./components/reports/CescBillReport";
import { calculateCescBill } from "./helpers/calculations/CescBillCalculation";
import {
  cescBillValidate,
  initialValues,
} from "./helpers/validators/CescBillValidate";

function App() {
  const [bill, setBill] = useState({});

  const formik = useFormik({
    initialValues,
    validate: cescBillValidate,
    onSubmit: (values) => {
      const report = calculateCescBill(values.unit);
      setBill(report);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="card">
        <h1 className="text-2xl text-center text-white mb-2">
          Calculate CESC Meter Price
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-wrapper">
            <div className="grow">
              <input
                type="number"
                min={0}
                id="unit"
                placeholder="Enter unit"
                className={`form-control ${formik.errors.unit ? "error" : ""}`}
                {...formik.getFieldProps("unit")}
              />
              {formik.touched.unit && formik.errors.unit ? (
                <p className="form-control-error">{formik.errors.unit}</p>
              ) : null}
            </div>
            <div className="flex-none">
              <button className="btn btn-primary" type="submit">
                Calculate
              </button>
            </div>
          </div>
        </form>

        {bill.bill ? <CescBillSplit result={bill} /> : null}
      </div>
    </div>
  );
}

export default App;
