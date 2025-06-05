const Results = () => {
  return (
    <div className='w-full px-4 py-2 bg-background border border-primary-light rounded text-white'>
      <h2 className='text-lg font-semibold mb-4'>Podsumowanie finansowe</h2>
      <table className='w-full table-fixed text-sm'>
        <tbody className='divide-y divide-primary-light/20'>
          <tr>
            <td className='py-2'>Kwota brutto</td>
            <td className='py-2 text-right'>12 300 zł</td>
          </tr>
          <tr>
            <td className='py-2'>VAT (23%)</td>
            <td className='py-2 text-right'>-2 300 zł</td>
          </tr>
          <tr>
            <td className='py-2'>Kwota netto przed kosztami</td>
            <td className='py-2 text-right'>10 000 zł</td>
          </tr>
          <tr>
            <td className='py-2'>Koszty uzyskania</td>
            <td className='py-2 text-right'>-1 200 zł</td>
          </tr>
          <tr>
            <td className='py-2'>ZUS (całkowity)</td>
            <td className='py-2 text-right'>-1 400 zł</td>
          </tr>
          <tr>
            <td className='py-2'>Podatek dochodowy</td>
            <td className='py-2 text-right'>-900 zł</td>
          </tr>
          <tr className='font-semibold text-primary-light'>
            <td className='py-2'>Dochód na rękę</td>
            <td className='py-2 text-right'>6 500 zł</td>
          </tr>
          <tr className='text-xs text-text/70'>
            <td className='pt-4'>Efektywna dniówka</td>
            <td className='pt-4 text-right'>325 zł / dzień</td>
          </tr>
          <tr className='text-xs text-text/70'>
            <td className='py-1'>Efektywna stawka godzinowa</td>
            <td className='py-1 text-right'>40,63 zł / godz.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Results;