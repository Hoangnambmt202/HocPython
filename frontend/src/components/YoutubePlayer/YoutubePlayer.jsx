import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

// eslint-disable-next-line react/prop-types
const YouTubePlayer = ({ url, onProgress, onVideoComplete }) => {
  const playerRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);
  const progressCheckInterval = useRef(null);

  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const startProgressCheck = (player) => {
    if (progressCheckInterval.current) {
      clearInterval(progressCheckInterval.current);
    }

    progressCheckInterval.current = setInterval(() => {
      const currentTime = player.getCurrentTime();
      const progress = (currentTime / duration) * 100;

      // Gọi callback để cập nhật tiến độ
      if (onProgress) {
        onProgress(progress);
      }

      // Kiểm tra nếu đã xem 80% video và chưa đánh dấu hoàn thành
      if (progress >= 80 && !hasReachedThreshold) {
        setHasReachedThreshold(true);
        if (onVideoComplete) {
          onVideoComplete(true);
        }
      }
    }, 1000); // Kiểm tra mỗi giây
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event) => {
    // Bắt đầu theo dõi khi video đang phát
    if (event.data === YouTube.PlayerState.PLAYING) {
      startProgressCheck(event.target);
    }
    // Tạm dừng theo dõi khi video dừng hoặc kết thúc
    else if (event.data === YouTube.PlayerState.PAUSED || 
             event.data === YouTube.PlayerState.ENDED) {
      if (progressCheckInterval.current) {
        clearInterval(progressCheckInterval.current);
      }
    }
  };

  useEffect(() => {
    // Cleanup khi component unmount
    return () => {
      if (progressCheckInterval.current) {
        clearInterval(progressCheckInterval.current);
      }
    };
  }, []);

  const videoId = getVideoId(url);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div className="video-wrapper">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </div>
  );
};

export default YouTubePlayer;
