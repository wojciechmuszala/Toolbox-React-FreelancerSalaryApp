import { useState } from "react";
import Switch from "./ui/Switch.jsx";

const UserInputs = ({ onSetUserData }) => {
  const [isGross, setIsGross] = useState(false);
  const [taxForm, setTaxForm] = useState("");

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
      reliefs: {
        startupRelief: form.startupRelief.checked,
        smallZUS: form.smallZUS.checked,
        smallZUSPlus: form.smallZUSPlus.checked,
        isFlatRate: form.isFlatRate.checked,
        youthRelief: form.youthRelief.checked,
        ipBox: form.ipBox.checked,
        useCosts: form.useCosts.checked,
      },
    };
    console.log("taxForm:", taxForm);
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
            <select
              id='taxForm'
              required
              className='input'
              onChange={(e) => setTaxForm(e.target.value)}>
              <option value=''>-- wybierz --</option>
              <option value='progresywny'>Skala podatkowa (12% / 32%)</option>
              <option value='ryczalt'>Ryczałt</option>
              <option value='liniowy'>Podatek liniowy</option>
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
        <div className={taxForm ? "" : "opacity-50 pointer-events-none"}>
          <label className='block text-sm font-medium mb-2'>
            Ulgi i preferencje
          </label>
          <div
            className={`w-full px-4 py-2 bg-background border border-primary-light rounded text-white`}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2'>
              {/* ZUSowe - dostępne zawsze */}
              <label
                htmlFor='startupRelief'
                className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='checkbox'
                  name='startupRelief'
                  id='startupRelief'
                />
                Ulga na start
              </label>
              <label htmlFor='smallZUS' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='checkbox'
                  name='smallZUS'
                  id='smallZUS'
                />
                Preferencyjny ZUS (niski)
              </label>
              <label htmlFor='smallZUSPlus' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='checkbox'
                  name='smallZUSPlus'
                  id='smallZUSPlus'
                />
                Mały ZUS Plus
              </label>

              {/* Ryczałt tylko przy ryczałcie */}
              {taxForm === "ryczalt" && (
                <label htmlFor='isFlatRate' className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    className='checkbox'
                    name='isFlatRate'
                    id='isFlatRate'
                  />
                  Ryczałt od przychodów
                </label>
              )}

              {/* Ulga dla młodych tylko przy progresywnym */}
              {taxForm === "progresywny" && (
                <label
                  htmlFor='youthRelief'
                  className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    className='checkbox'
                    name='youthRelief'
                    id='youthRelief'
                  />
                  Ulga dla młodych (&lt;26 lat)
                </label>
              )}

              {/* IP BOX tylko przy liniowym */}
              {taxForm === "liniowy" && (
                <label htmlFor='ipBox' className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    className='checkbox'
                    name='ipBox'
                    id='ipBox'
                  />
                  IP BOX (5% PIT)
                </label>
              )}

              {/* Koszty tylko przy progresywnym lub liniowym */}
              {(taxForm === "liniowy" || taxForm === "progresywny") && (
                <label htmlFor='useCosts' className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    className='checkbox'
                    name='useCosts'
                    id='useCosts'
                  />
                  Uwzględniam koszty uzyskania
                </label>
              )}
            </div>
          </div>
        </div>
        <button className='btn-primary mx-auto mt-12'>Oblicz</button>
      </form>
    </section>
  );
};

export default UserInputs;
