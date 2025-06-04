import { useState } from "react";
import Switch from "./ui/Switch.jsx";

const UserInputs = ({ onSetUserData }) => {
  const [isGross, setIsGross] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = {
      monthlyRateNetto: form.monthlyRateNetto.value || null,
      monthlyRateBrutto: form.monthlyRateBrutto.value || null,
      daysOff: form.daysOff.value,
      taxForm: form.taxForm.value,
      commuteCount: form.commuteCount.value,
      commuteDistance: form.commuteDistance.value,
    };

    onSetUserData(formData);
  };

  return (
    <section>
      <div className='w-full'>
        <label className='block text-sm font-medium mb-1'>Kwota</label>
        <Switch checked={isGross} onChange={setIsGross} />
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {isGross ? (
          <div className='flex gap-4'>
            <p className='w-full'>
              <label htmlFor='monthlyRateBrutto' className='label'>
                Stawka miesięczna (brutto)
              </label>
              <input
                id='monthlyRateBrutto'
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
              <label htmlFor='monthlyRateNetto' className='label'>
                Stawka miesięczna (netto)
              </label>
              <input
                id='monthlyRateNetto'
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
            <label htmlFor='daysOff' className='label'>
              Dni wolne
            </label>
            <input
              id='daysOff'
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
              <option value='progresywny'>Skala podatkowa</option>
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
