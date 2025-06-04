const Switch = ({ checked, onChange }) => {
  return (
    <div className='flex items-center gap-4 py-2'>
      <span
        className={`text-sm ${
          !checked ? "text-primary-ultra-light" : "text-text"
        }`}>
        Netto
      </span>

      <button
        type='button'
        onClick={() => onChange((prev) => !prev)}
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 
          ${checked ? "bg-primary-light" : "bg-gray-600"}`}>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
      ${checked ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>

      <span
        className={`text-sm ${
          checked ? "text-primary-ultra-light" : "text-text"
        }`}>
        Brutto
      </span>
    </div>
  );
};

export default Switch;
