import { useSelector } from "react-redux";
import {
  CescSlabRatesCommertial,
  CescSlabRatesResidential,
} from "../../config/CescConfig";
import { DOMESTIC_TYPE } from "../../config/constants";
import { indianCurrency } from "../../helpers/utils";

export const CescBillSplit = () => {
  const unit = useSelector((state) => state.cescBill.fields.unit);
  const meterType = useSelector((state) => state.cescBill.fields.meterType);
  const slabs =
    meterType === DOMESTIC_TYPE
      ? CescSlabRatesResidential
      : CescSlabRatesCommertial;
  const bill = useSelector((state) => state.cescBill.bill);
  const energyCharges = useSelector((state) => state.cescBill.energyCharges);
  const mvca = useSelector((state) => state.cescBill.mvca);
  const fixedCharge = useSelector((state) => state.cescBill.fixedCharge);
  const govDuty = useSelector((state) => state.cescBill.govDuty);
  const meterRent = useSelector((state) => state.cescBill.meterRent);
  const rebate = useSelector((state) => state.cescBill.rebate);
  const grossAmount = useSelector((state) => state.cescBill.grossAmount);
  const finalBill = useSelector((state) => state.cescBill.finalBill);

  return (
    <>
      {energyCharges > 0 && (
        <div className="relative overflow-x-auto mt-3">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Monthly Consumption
                </th>
                <th scope="col" className="px-6 py-3">
                  Gross Rate
                </th>
                <th scope="col" className="px-6 py-3">
                  Energy Charges(Rs.)
                </th>
              </tr>
            </thead>
            <tbody>
              {bill.map((amount, index) => (
                <tr key={slabs[index].id} className="table-row">
                  <th scope="row" className="table-th">
                    Unit{" "}
                    {unit > slabs[index].max
                      ? slabs[index].label
                      : `${slabs[index - 1]?.max || 0} - ${unit}`}
                  </th>
                  <td className="table-td">
                    {indianCurrency(slabs[index].rate)}
                  </td>
                  <td className="table-td">{indianCurrency(amount)}</td>
                </tr>
              ))}
              <tr className="table-row">
                <th scope="row" className="table-th bg-amber-400" colSpan={2}>
                  Total Energy Charges
                </th>
                <td className="table-td bg-amber-400">
                  {indianCurrency(energyCharges)}
                </td>
              </tr>
              <tr className="table-row">
                <th scope="row" className="table-th" colSpan={2}>
                  <abbr title="Monthly Variable Cost Adjustment">MVCA</abbr>
                </th>
                <td className="table-td">{indianCurrency(mvca)}</td>
              </tr>
              <tr className="table-row">
                <th scope="row" className="table-th" colSpan={2}>
                  Fixed/Demand Charges
                </th>
                <td className="table-td">{indianCurrency(fixedCharge)}</td>
              </tr>
              <tr className="table-row">
                <th scope="row" className="table-th" colSpan={2}>
                  Govt. Duty
                </th>
                <td className="table-td">{indianCurrency(govDuty)}</td>
              </tr>
              <tr className="table-row">
                <th scope="row" className="table-th" colSpan={2}>
                  Meter Rent
                </th>
                <td className="table-td">{indianCurrency(meterRent)}</td>
              </tr>
              <tr className="table-row">
                <th scope="row" className="table-th bg-sky-400" colSpan={2}>
                  Gross Amount
                </th>
                <td className="table-td bg-sky-400 text-white">
                  {indianCurrency(grossAmount)}
                </td>
              </tr>
              <tr className="table-row">
                <th scope="row" className="table-th bg-red-400" colSpan={2}>
                  Rebate
                </th>
                <td className="table-td bg-red-400 text-white">
                  -{indianCurrency(rebate)}
                </td>
              </tr>
              <tr className="table-row">
                <th scope="row" className="table-th bg-green-400" colSpan={2}>
                  Net Amount
                </th>
                <td className="table-td bg-green-400 text-white">
                  {indianCurrency(finalBill)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
