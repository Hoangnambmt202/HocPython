const LessonService = require("../services/LessonService");
const ttsService = require("../services/ttsService")
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

// Rate limiting for code execution
const codeExecutionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Too many code execution requests, please try again later'
});

// Sandbox directory for code execution
const SANDBOX_DIR = path.join(os.tmpdir(), 'code-sandbox');

// Create sandbox directory if it doesn't exist
const ensureSandboxDir = async () => {
  try {
    await fs.access(SANDBOX_DIR);
  } catch {
    await fs.mkdir(SANDBOX_DIR, { recursive: true });
  }
};

// Clean up sandbox files
const cleanupSandbox = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error cleaning up sandbox:', error);
  }
};

// Validate test cases
const validateTestCases = (testCases) => {
  if (!Array.isArray(testCases)) {
    throw new Error('Test cases must be an array');
  }
  
  for (const testCase of testCases) {
    if (typeof testCase.input !== 'string' || typeof testCase.expectedOutput !== 'string') {
      throw new Error('Invalid test case format');
    }
  }
};

// Tạo bài giảng mới và cập nhật Chapter
const createLesson = async (req, res) => {
  try {
    
    const { chapterId } = req.params;
    const lessonData = req.body;
    const h5pFile = req.file;
    const lesson = await LessonService.createLesson(chapterId, lessonData, h5pFile);

    res.status(201).json({ status: "success",message: "Tạo bài học thành công", data: lesson });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};


const getAllLessons = async (req, res) => {
  try {
    const lessons = await LessonService.getAllLessons();
   
    res.status(200).json({status: "success", message:"Danh sách tất cả bài học", data: lessons})
  }
  catch (error) {
    res.status(500).json({status: "error", message: "Lỗi khi lấy danh sách bài học: " + error.message});
  }
}

// Lấy tất cả bài giảng theo Chapter
const getLessonsByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const lessons = await LessonService.getLessonsByChapter(chapterId);
    res.status(200).json({status: "success", message: "DS bài giảng theo chương", data: lessons});
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy DS bài giảng ở server: " + error.message });
  }
};

// Cập nhật bài giảng
const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const data = req.body;
    const updatedLesson = await LessonService.updateLesson(lessonId, data);
    res.status(200).json({status: "success", message: "Cập nhật bài giảng thành công", data: updatedLesson});
  
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật bài giảng ở server: " + error.message });
  }
};

// Xóa bài giảng và cập nhật Chapter
const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    await LessonService.deleteLesson(lessonId);
    res.status(200).json({status: "success", message: "Xóa bài giảng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bài giảng ở server: " + error.message });
  }
};

// Run code with test cases
const runCode = async (req, res) => {
  try {
    const { code, testCases, lessonId } = req.body;
    
    // console.log('=== Request Debug ===');
    // console.log('Received code:', code);
    // console.log('Test cases:', JSON.stringify(testCases, null, 2));
    
    // Validate input
    if (!code || !testCases || !lessonId) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    // Process code based on content
    let processedCode = code;
    if (!code.includes('print(') && !code.includes('print ')) {
      // If code is just a plain string (e.g. nam), add quotes and print
      if (!code.startsWith('"') && !code.startsWith("'")) {
        processedCode = `print("${code}")`;
      } else {
        // If code is already a string literal (e.g. "nam"), just add print
        processedCode = `print(${code})`;
      }
    }
    
    console.log('Processed code:', processedCode);
    
    // Run code through service
    const result = await LessonService.runCode({
      code: processedCode,
      testCases,
      lessonId
    });
    
    console.log('Service result:', JSON.stringify(result, null, 2));
    res.json(result);
    
  } catch (error) {
    console.error('Code execution error:', error);
    res.status(500).json({
      success: false,
      error: 'Error executing code',
      message: error.message
    });
  }
};

// Get code execution result
const getCodeExecutionResult = async (req, res) => {
  try {
    const { jobId } = req.params;
    const result = await LessonService.getCodeExecutionResult(jobId);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error getting execution result',
      message: error.message
    });
  }
};
const textToSpeech = async (req, res) => {
  try {
    const { text } = req.body;  // Lấy văn bản từ frontend gửi lên
    if (!text) {
      return res.status(400).json({ message: 'Văn bản không được để trống' });
    }

    // Gọi service để tạo âm thanh từ văn bản
    const audioBuffer = await ttsService.generateSpeechFromText(text);

    // Trả về âm thanh dưới dạng mp3
    res.set('Content-Type', 'audio/mpeg');
    res.send(audioBuffer);
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ message: 'Lỗi khi tạo âm thanh' });
  }
};
module.exports = {
    createLesson,
    getAllLessons,
    getLessonsByChapter,
    updateLesson,
    deleteLesson,
    runCode,
    getCodeExecutionResult,
    codeExecutionLimiter,
    textToSpeech,
}