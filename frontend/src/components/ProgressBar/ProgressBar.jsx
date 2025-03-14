// eslint-disable-next-line react/prop-types
const ProgressBar = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all text-sm flex items-center justify-center text-white duration-500"
          style={{ width: `${progress}%` }}
        >{progress}%</div>
      </div>
    );
  };
  
  export default ProgressBar;
  