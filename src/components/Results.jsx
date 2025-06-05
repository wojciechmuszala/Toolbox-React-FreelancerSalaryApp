import { calculateEarnings, format } from "../utils/calculateEarnings";

const Results = ({ userData }) => {
  const noData = !userData || Object.keys(userData).length === 0;
  const results = noData ? {} : calculateEarnings(userData);

  console.log("userData:", userData);
  console.log("Results:", results);

  return (
    <div className='w-full px-4 py-2 bg-background border border-primary-light rounded text-white'>
      <h2 className='text-lg font-semibold mb-4'>Podsumowanie finansowe</h2>
      <table className='w-full table-fixed text-sm'>
        <tbody className='divide-y divide-primary-light/20'>
          <tr>
            <td className='py-2'>Kwota netto (z formularza)</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.formNetIncome)}
            </td>
          </tr>
          <tr>
            <td className='py-2'>Kwota brutto (z formularza)</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.formGrossIncome)}
            </td>
          </tr>
          <tr>
            <td className='py-2'>VAT (23%)</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.vat)}
            </td>
          </tr>
          <tr>
            <td className='py-2'>ZUS (całkowity)</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.socialSecurity)}
            </td>
          </tr>
          <tr>
            <td className='py-2'>Podatek dochodowy</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.incomeTax)}
            </td>
          </tr>

          <tr>
            <td className='py-2'>Koszty uzyskania</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.expenses)}
            </td>
          </tr>
          <tr>
            <td className='py-2'>Dochód na rękę po kosztach</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.netIncome)}
            </td>
          </tr>
          <tr className='text-xs text-text/70'>
            <td className='pl-4 py-1'>Dniówka</td>
            <td className='py-1 text-right'>
              {noData ? "-" : format(results.netIncome / 21)}
            </td>
          </tr>
          <tr className='text-xs text-text/70'>
            <td className='pl-4 py-1'>Stawka godzinowa</td>
            <td className='py-1 text-right'>
              {noData ? "-" : format(results.netIncome / 168)}
            </td>
          </tr>
          <tr className='font-semibold text-primary-light'>
            <td className='py-2'>Dochód na rękę przed kosztami</td>
            <td className='py-2 text-right'>
              {noData ? "-" : format(results.netIncomeBeforeExpenses)}
            </td>
          </tr>

          <tr className='text-xs text-text/70'>
            <td className='pl-4 py-1'>Dniówka</td>
            <td className='py-1 text-right'>
              {noData ? "-" : format(results.netIncomeBeforeExpenses / 21)}
            </td>
          </tr>
          <tr className='text-xs text-text/70'>
            <td className='pl-4 py-1'>Stawka godzinowa</td>
            <td className='py-1 text-right'>
              {noData ? "-" : format(results.netIncomeBeforeExpenses / 168)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Results;
