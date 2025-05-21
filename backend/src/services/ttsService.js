const axios = require("axios");
const htmlEntities = require('he'); // Giúp xử lý HTML entities

const AZURE_KEY = process.env.AZURE_KEY;  // Lấy key từ biến môi trường
const AZURE_REGION = process.env.AZURE_REGION; // Lấy region từ biến môi trường

// Loại bỏ HTML tags và decode HTML entities
const stripHtml = (html) => {
  const plain = html.replace(/<[^>]*>/g, '');  // Loại bỏ các thẻ HTML
  return htmlEntities.decode(plain);          // Decode các entities như &amp;, &nbsp;
};

// Chức năng tạo giọng nói từ văn bản
const generateSpeechFromText = async (rawHtml) => {
  
  const plainText = stripHtml(rawHtml);  // Xử lý văn bản từ CKEditor

  const ssml = `
  <speak version='1.0' xml:lang='vi-VN'>
    <voice name='vi-VN-HoaiMyNeural'>${plainText}</voice>
  </speak>
  `;

  const response = await axios({
    method: "POST",
    url: `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    headers: {
      "Ocp-Apim-Subscription-Key": AZURE_KEY,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    },
    data: ssml,
    responseType: "arraybuffer",  // Nhận dữ liệu âm thanh dưới dạng binary
  });

  return response.data;  // Trả về âm thanh
};

module.exports = { generateSpeechFromText };
