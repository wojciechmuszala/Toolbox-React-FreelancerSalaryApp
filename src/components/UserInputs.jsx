import { useState } from "react";
import Switch from "./ui/Switch.jsx";

const UserInputs = ({ onSetUserData }) => {
  const [isGross, setIsGross] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = {
      isGross: isGross,
      monthlyRate: form.monthlyRate.value,
      unpaidDaysOff: form.unpaidDaysOff.value,
      taxForm: form.taxForm.value,
      commuteCount: form.commuteCount.value,
      commuteDistance: form.commuteDistance.value,
    };
    console.log("Form Data:", formData);
    onSetUserData(formData);
  };

  return (
    <section>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='w-full'>
          <label className='block text-sm font-medium mb-1'>Typ kwoty</label>
          <Switch checked={isGross} onChange={setIsGross} />
        </div>
        {isGross ? (
          <div className='flex gap-4'>
            <p className='w-full'>
              <label htmlFor='monthlyRate' className='label'>
                Stawka miesięczna (brutto)
              </label>
              <input
                id='monthlyRate'
                type='number'
                required
                className='input'
                placeholder='np. 12300'
              />
            </p>
          </div>
        ) : (
          <div className='flex gap-4'>
            <p className='w-full'>
              <label htmlFor='monthlyRate' className='label'>
                Stawka miesięczna (netto)
              </label>
              <input
                id='monthlyRate'
                type='number'
                required
                className='input'
                placeholder='np. 10000'
              />
            </p>
          </div>
        )}
        <div className='flex gap-4'>
          <p className='w-full'>
            <label htmlFor='unpaidDaysOff' className='label'>
              Bezpłatne dni wolne
            </label>
            <input
              id='unpaidDaysOff'
              type='number'
              className='input'
              placeholder='np. 2'
            />
          </p>
        </div>
        <div className='flex gap-4'>
          <p className='w-full'>
            <label htmlFor='taxForm' className='label'>
              Forma opodatkowania
            </label>
            <select id='taxForm' required className='input'>
              <option value=''>-- wybierz --</option>
              <option value='liniowy'>Podatek liniowy</option>
              <option value='progresywny'>Skala podatkowa (12% / 32%)</option>
              <option value='ryczalt'>Ryczałt</option>
            </select>
          </p>
        </div>
        <div className='flex gap-4'>
          <p className='w-full'>
            <label htmlFor='commuteCount' className='label'>
              Liczba dojazdów (miesięcznie)
            </label>
            <input
              id='commuteCount'
              type='number'
              className='input'
              placeholder='np. 10'
            />
          </p>
          <p className='w-full'>
            <label htmlFor='commuteDistance' className='label'>
              Kilometraż w jedną stronę (km)
            </label>
            <input
              id='commuteDistance'
              type='number'
              className='input'
              placeholder='np. 15'
            />
          </p>
        </div>
        <button className='btn-primary mx-auto mt-12'>Oblicz</button>
      </form>
    </section>
  );
};

export default UserInputs;
