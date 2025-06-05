import { useState } from "react";
import Switch from "./ui/Switch.jsx";
import InfoTooltip from "./ui/InfoTooltip.jsx";

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
      reliefs: {
        isVatPayer: form.isVatPayer?.checked || false,
        startupRelief: form.startupRelief?.checked || false,
        smallZUS: form.smallZUS?.checked || false,
        smallZUSPlus: form.smallZUSPlus?.checked || false,
        isFlatRate: form.isFlatRate?.checked || false,
        youthRelief: form.youthRelief?.checked || false,
        ipBox: form.ipBox?.checked || false,
        useCosts: form.useCosts?.checked || false,
      },
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
        <div className={taxForm ? "" : "opacity-50 pointer-events-none"}>
          <label className='block text-sm font-medium mb-2'>
            Ulgi i preferencje
          </label>
          <div
            className={`w-full px-4 py-2 bg-background border border-primary-light rounded text-white`}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2'>
              {/* ZUSowe - dostępne zawsze */}
              <label htmlFor='isVatPayer' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='checkbox'
                  name='isVatPayer'
                  id='isVatPayer'
                />
                Podatnik VAT
                <InfoTooltip text='Status podatnika VAT oznacza, że jesteś zobowiązany do rozliczania podatku VAT od swojej działalności.' />
              </label>
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
                <InfoTooltip text='Ulga na start to zwolnienie z opłacania składek na ubezpieczenia społeczne przez pierwsze 6 miesięcy prowadzenia działalności. Składka zdrowotna nadal obowiązuje.' />
              </label>
              <label htmlFor='smallZUS' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='checkbox'
                  name='smallZUS'
                  id='smallZUS'
                />
                Preferencyjny ZUS (niski)
                <InfoTooltip text='Preferencyjny ZUS to obniżone składki na ubezpieczenia społeczne przez pierwsze 24 miesiące działalności.' />
              </label>
              <label htmlFor='smallZUSPlus' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='checkbox'
                  name='smallZUSPlus'
                  id='smallZUSPlus'
                />
                Mały ZUS Plus
                <InfoTooltip text='Mały ZUS Plus to obniżone składki ZUS dla przedsiębiorców o niskich przychodach, dostępne po okresie preferencyjnym.' />
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
                  <InfoTooltip text='Ryczałt od przychodów to forma opodatkowania, gdzie podatek płacisz od przychodu, bez możliwości odliczania kosztów.' />
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
                  <InfoTooltip text='Ulga dla młodych pozwala na zwolnienie z podatku dochodowego dla osób poniżej 26 roku życia.' />
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
                  <InfoTooltip text='IP BOX to preferencyjna stawka podatku 5% dla dochodów z kwalifikowanych praw własności intelektualnej.' />
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
                  <InfoTooltip text='Uwzględnianie kosztów uzyskania przychodu pozwala na pomniejszenie podstawy opodatkowania o poniesione wydatki.' />
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
