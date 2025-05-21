import { Volume2 } from 'lucide-react';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const TextToSpeechBtn = ({ lessonContent }) => {
  const [isPlaying, setIsPlaying] = useState(false);  // Trạng thái phát âm thanh
  const [audio, setAudio] = useState(null);  // Đối tượng Audio
  const [currentTime, setCurrentTime] = useState(0);  // Lưu thời gian hiện tại khi dừng
  const [isStopped, setIsStopped] = useState(false);  // Kiểm tra nếu âm thanh đã bị dừng

  // Hàm xử lý đọc văn bản khi người dùng nhấn nút "Đọc"
  const handleReadText = async () => {
    setIsPlaying(true);  // Đánh dấu trạng thái đang phát âm thanh
    setIsStopped(false);  // Đánh dấu trạng thái chưa dừng

    try {
      const response = await fetch('http://localhost:5000/api/lessons/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lessonContent }),  // Gửi nội dung bài học
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioObjectUrl = URL.createObjectURL(audioBlob);

        const newAudio = new Audio(audioObjectUrl);
        newAudio.currentTime = currentTime;  // Tiếp tục từ thời gian hiện tại nếu có
        newAudio.play();

        newAudio.onended = () => setIsPlaying(false);  // Khi âm thanh kết thúc
        newAudio.ontimeupdate = () => setCurrentTime(newAudio.currentTime);  // Cập nhật thời gian hiện tại khi phát

        setAudio(newAudio);  // Lưu đối tượng audio vào state
      } else {
        console.error('Lỗi khi gọi API');
      }
    } catch (error) {
      console.error('Lỗi khi lấy âm thanh:', error);
      setIsPlaying(false);  // Đặt lại trạng thái nếu có lỗi
    }
  };

  // Hàm dừng âm thanh
  const handleStop = () => {
    if (audio) {
      audio.pause();  // Dừng âm thanh
      setCurrentTime(audio.currentTime);  // Lưu lại thời gian dừng
      setIsPlaying(false);  // Đánh dấu trạng thái dừng
      setIsStopped(true);  // Đánh dấu trạng thái đã dừng
    }
  };

  // Hàm tiếp tục phát âm thanh
  const handleResume = () => {
    if (audio) {
      audio.play();  // Tiếp tục phát âm thanh
      setIsPlaying(true);  // Đánh dấu trạng thái đang phát
      setIsStopped(false);  // Đánh dấu trạng thái chưa dừng
    }
  };

  return (
    <div>
      {!isPlaying && !isStopped && (
        <button
          onClick={handleReadText}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
            <Volume2 />
        </button>
      )}
      {isPlaying && (
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Dừng
        </button>
      )}
      {isStopped && !isPlaying && (
        <button
          onClick={handleResume}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Tiếp tục
        </button>
      )}
      
    </div>
  );
};

export default TextToSpeechBtn;
