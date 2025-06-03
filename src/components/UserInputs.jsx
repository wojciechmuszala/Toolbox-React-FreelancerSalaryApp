const UserInputs = () => {
  return (
    <section className='flex flex-col gap-4'>
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
            placeholder='np. 12000'
          />
        </p>
      </div>
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
    </section>
  );
};

export default UserInputs;
