
import ReactPlayer from "react-player";

// eslint-disable-next-line react/prop-types
const YouTubePlayer = ({ url }) => {
  return (
    <div className="flex justify-center w-full">
      <ReactPlayer 
        url={url} 
        controls 
        width="100%" 
        height="400px"
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default YouTubePlayer;
