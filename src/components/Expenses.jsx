import { useState } from "react";
import InfoTooltip from "./ui/InfoTooltip.jsx";
import { format } from "../utils/calculateEarnings.js";

const Expenses = () => {
  const [costName, setCostName] = useState("");
  const [costAmount, setCostAmount] = useState("");
  const [costs, setCosts] = useState([]);

  const handleAddCost = () => {
    setCosts([...costs, { name: costName, amount: costAmount }]);
    setCostName("");
    setCostAmount("");
  };

  return (
    <div className='w-full mb-8'>
      <label className='flex gap-2 text-sm font-medium mb-2'>
        Dodaj koszt uzyskania przychodu
        <InfoTooltip text='Koszty uzyskania przychodu to wydatki, które pomniejszają podstawę opodatkowania.' />
      </label>

      <div className='flex gap-4 mb-4'>
        <input
          type='text'
          className='input w-1/3'
          placeholder='Nazwa kosztu (np. Paliwo)'
          value={costName}
          onChange={(e) => setCostName(e.target.value)}
        />
        <input
          type='number'
          className='input w-1/3'
          placeholder='Kwota brutto (zł)'
          value={costAmount}
          onChange={(e) => setCostAmount(e.target.value)}
        />
        <button className='btn-primary' onClick={handleAddCost} type='button'>
          +
        </button>
      </div>

      {/* Tabela z dodanymi kosztami */}
      <table className='w-full table-auto border border-primary-light rounded text-sm mt-4'>
        <thead>
          <tr className='bg-primary-ultra-light text-left text-white'>
            <th className='p-2 w-3/5'>Nazwa</th>
            <th className='p-2 w-1/5 text-center'>Kwota brutto</th>
            <th className='p-2 w-1/5 text-center'>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {/* Tu później będą mapowane koszty */}
          {costs.length === 0 ? (
            <tr className='opacity-40 pointer-events-none'>
              <td className='p-2 w-3/5'>np. Paliwo</td>
              <td className='p-2 w-1/5 text-center'>{format(267.02)}</td>
              <td className='p-2 w-1/5 text-center'>
                <button className='text-red-400 hover:text-red-600 text-sm'>
                  Usuń
                </button>
              </td>
            </tr>
          ) : (
            costs.map((cost, index) => (
              <tr key={index} className='border-t border-primary-light'>
                <td className='p-2 w-3/5'>{cost.name}</td>
                <td className='p-2 w-1/5 text-center'>{format(cost.amount)}</td>
                <td className='p-2 w-1/5 text-center'>
                  <button className='text-red-400 hover:text-red-600 text-sm'>
                    Usuń
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
