const { Queue } = require('bullmq');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fs = require('fs-extra');
const axios = require("axios");
const path = require('path');
const unzipper = require("unzipper");
const util = require("util");

const Lesson = require("../models/Lesson");
const Chapter = require("../models/Chapter");
const ChapterService = require("./ChapterService");
const ttsService = require("./ttsService");
const config = require('../config/config');


const codeExecutionQueue = new Queue('code-execution', {
  connection: {
    host: config.redis.host,
    port: config.redis.port
  }
});

const SANDBOX_DIR = path.join(process.cwd(), 'temp');

const ensureSandboxDir = async () => {
  try {
    await fs.access(SANDBOX_DIR);
  } catch {
    await fs.mkdir(SANDBOX_DIR, { recursive: true });
  }
};


const cleanupSandbox = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error cleaning up sandbox:', error);
  }
};


const executePythonCode = async (code, input = '') => {
  // Create unique file name
  const fileName = `code_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.py`;
  const filePath = path.join(SANDBOX_DIR, fileName);

  try {
    // Ensure sandbox directory exists
    await ensureSandboxDir();

    // Write code to file
    await fs.writeFile(filePath, code);

    // Execute code with input
    const { stdout, stderr } = await execAsync(`python ${filePath}`, {
      timeout: 5000,
      input: input
    });

    return {
      output: stdout.trim(),
      error: stderr || null
    };
  } catch (error) {
    return {
      output: null,
      error: error.stderr || error.message
    };
  } finally {
    // Clean up
    await cleanupSandbox(filePath);
  }
};


const runCode = async (codeData) => {
  const { code, testCases } = codeData;
  
  // Validate code
  if (!code) {
    throw new Error('Code is required');
  }

  // Validate test cases
  if (!Array.isArray(testCases)) {
    throw new Error('Test cases must be an array');
  }

  // Run test cases
  const results = [];
  for (const testCase of testCases) {
    const result = await executePythonCode(code, testCase.input);
    
    results.push({
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: result.output,
      passed: result.output === testCase.expectedOutput,
      error: result.error
    });
  }

  return {
    success: true,
    results,
    allPassed: results.every(r => r.passed)
  };
};

// Tạo bài học
const createLesson = async (chapterId, data) => {
  try {
    
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      throw new Error("Chương không tồn tại");
    }
    // let audioUrl = null;
    //  if (data.type === "theory" && data.content) {
    //   try {
    //     audioUrl = await ttsService.generateSpeechFromText(data.content);
    //   } catch (ttsError) {
    //     console.warn("Không thể tạo audio từ lý thuyết:", ttsError.message);
    //   }
    // }
    const newLesson = new Lesson({
      ...data,
      chapterId,
      // audioUrl,
    });

    await newLesson.save();

    if (!chapter.lessons) {
      chapter.lessons = [];
    }
    chapter.lessons.push(newLesson._id);
    await chapter.save();

    await ChapterService.updateChapterLessonCount(chapterId);

    return newLesson;
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

// Lấy bài học theo chapter
const getLessonsByChapter = async (chapterId) => {
  return await Lesson.find({ chapterId }).sort("order");
};
// Lấy tất cả bài học
const getAllLessons = async () => {
  return await Lesson.find().populate("chapterId", "title")
  
};

// Cập nhật bài học
const updateLesson = async (lessonId, data) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      data,
      { new: true }
    );

    if (!updatedLesson) {
      throw new Error("Bài học không tồn tại");
    }

    return updatedLesson;
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

// Xóa bài học
const deleteLesson = async (lessonId) => {
  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      throw new Error("Bài học không tồn tại");
    }

    const chapterId = lesson.chapterId;

    // Xóa bài học
    await Lesson.findByIdAndDelete(lessonId);

    // Cập nhật chương
    const chapter = await Chapter.findById(chapterId);
    if (chapter) {
      chapter.lessons = chapter.lessons.filter(id => id.toString() !== lessonId);
      await chapter.save();

      // Cập nhật tổng số bài học trong chương
      await ChapterService.updateChapterLessonCount(chapterId);
    }

    return { success: true, message: "Xóa bài học thành công" };
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
};

// Phương thức để kiểm tra kết quả của một job
const getCodeExecutionResult = async (jobId) => {
  const job = await codeExecutionQueue.getJob(jobId);
  
  if (!job) {
    throw new Error("Không tìm thấy công việc");
  }
  
  // Lấy trạng thái hiện tại
  const state = await job.getState();
  const result = job.returnvalue;
  
  return {
    jobId,
    status: state,
    completed: state === 'completed',
    result: state === 'completed' ? result : null,
    failReason: job.failedReason || null
  };
};

// Lưu kết quả bài làm của sinh viên
const saveStudentSubmission = async (userId, lessonId, code, results) => {
  // Tính điểm dựa trên số test case pass
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;
  const score = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
  
  // Tạo bản ghi submission mới
  const submission = new StudentSubmission({
    userId,
    lessonId,
    code,
    results,
    score,
    submittedAt: new Date()
  });
  
  await submission.save();
  
  // Cập nhật tiến độ học tập của sinh viên nếu cần
  // ...
  
  return submission;
};

module.exports = { createLesson, getAllLessons, getLessonsByChapter, updateLesson, deleteLesson, runCode , getCodeExecutionResult,
  saveStudentSubmission};