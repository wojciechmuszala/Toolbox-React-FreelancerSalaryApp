const InfoTooltip = ({ text }) => {
  return (
    <span className='relative flex items-center ml-1 cursor-pointer group'>
      <span className='inline-block w-4 h-4 text-center text-xs font-bold border border-gray-400 rounded-full text-gray-600 bg-gray-200 select-none'>
        i
      </span>
      <span className='absolute bottom-full mb-2 w-64 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none z-10'>
        {text}
      </span>
    </span>
  );
};

export default InfoTooltip;
