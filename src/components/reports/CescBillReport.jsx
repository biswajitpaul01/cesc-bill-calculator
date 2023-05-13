import { CescSlabRates } from "../../config/CescConfig";
import { indianCurrency } from "../../helpers/utils";

export const CescBillSplit = ({ result }) => {
  const {
    initialUnit,
    bill,
    totalBill,
    mvca,
    fixedCharge,
    govDuty,
    meterRent,
    rebate,
  } = result;

  return (
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
            <tr key={CescSlabRates[index].id} className="table-row">
              <th scope="row" className="table-th">
                Unit{" "}
                {initialUnit > CescSlabRates[index].max
                  ? CescSlabRates[index].label
                  : `${CescSlabRates[index - 1]?.max || 0} - ${initialUnit}`}
              </th>
              <td className="table-td">
                {indianCurrency(CescSlabRates[index].rate)}
              </td>
              <td className="table-td">{indianCurrency(amount)}</td>
            </tr>
          ))}
          <tr className="table-row">
            <th scope="row" className="table-th" colSpan={2}>
              Total Energy Charges
            </th>
            <td className="table-td">{indianCurrency(totalBill)}</td>
          </tr>
          <tr className="table-row">
            <th scope="row" className="table-th" colSpan={2}>
              Fixed Charges
            </th>
            <td className="table-td">{indianCurrency(fixedCharge)}</td>
          </tr>
          <tr className="table-row">
            <th scope="row" className="table-th" colSpan={2}>
              Meter Rent
            </th>
            <td className="table-td">{indianCurrency(meterRent)}</td>
          </tr>
          <tr className="table-row">
            <th scope="row" className="table-th" colSpan={2}>
              MVCA
            </th>
            <td className="table-td">{indianCurrency(mvca)}</td>
          </tr>
          <tr className="table-row">
            <th scope="row" className="table-th" colSpan={2}>
              Govt. Duty
            </th>
            <td className="table-td">{indianCurrency(govDuty)}</td>
          </tr>
          <tr className="table-row">
            <th scope="row" className="table-th" colSpan={2}>
              Rebate
            </th>
            <td className="table-td">-{indianCurrency(rebate)}</td>
          </tr>
          <tr className="table-row">
            <th scope="row" className="table-th" colSpan={2}>
              Total
            </th>
            <td className="table-td">
              {indianCurrency(
                totalBill + fixedCharge + mvca + govDuty + meterRent - rebate
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
