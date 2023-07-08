import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { CescBillSplit } from "./components/reports/CescBillReport";
import { COMMERCIAL_TYPE, DOMESTIC_TYPE } from "./config/constants";
import {
  cescBillValidate,
  initialValues,
} from "./helpers/validators/CescBillValidate";
import { cescBillActions } from "./store/cesc-bill-slice";

function App() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.cescBill);

  const formik = useFormik({
    initialValues,
    validate: cescBillValidate,
    onSubmit: () => {
      dispatch(cescBillActions.calculateBill());
    },
  });

  const handleChange = (field) => (evt) => {
    const val = evt.target.value;
    formik.setFieldValue(field, val);
    dispatch(cescBillActions.setFormData({ field, value: val }));
  };

  return (
    <div className="container mx-auto">
      <div className="card">
        <h1 className="text-2xl text-center text-white mb-2">
          Calculate CESC Meter Price
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-wrapper flex-wrap">
            <div className="flex">
              <div className="flex items-center mr-4">
                <input
                  id="inline-radio"
                  type="radio"
                  name="meterType"
                  value={DOMESTIC_TYPE}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange("meterType")}
                  defaultChecked={formik.values.meterType === DOMESTIC_TYPE}
                />
                <label
                  htmlFor="inline-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Domestic
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="inline-2-radio"
                  type="radio"
                  name="meterType"
                  value={COMMERCIAL_TYPE}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange("meterType")}
                  defaultChecked={formik.values.meterType === COMMERCIAL_TYPE}
                />
                <label
                  htmlFor="inline-2-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Commercial
                </label>
              </div>
            </div>
            <div className="flex w-full">
              <div className="grow">
                <input
                  type="number"
                  min={0}
                  name="unit"
                  id="unit"
                  step={1}
                  placeholder="Enter unit"
                  value={form.unit}
                  className={`form-control ${
                    formik.errors.unit ? "error" : ""
                  }`}
                  onChange={handleChange("unit")}
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
          </div>
        </form>

        <CescBillSplit />
      </div>
    </div>
  );
}

export default App;
