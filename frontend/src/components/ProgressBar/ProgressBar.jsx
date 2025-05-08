// eslint-disable-next-line react/prop-types
const ProgressBar = ({ progress , completedLessons, totalLessons}) => {
    return (
      <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">
          {completedLessons}/{totalLessons} bài học
        </span>
        <span className="text-xs font-medium text-orange-500">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
    );
  };
  
  export default ProgressBar;
  