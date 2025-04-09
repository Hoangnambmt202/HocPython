const { Worker } = require('bullmq');
const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');

// Khởi tạo Docker client
const docker = new Docker();

// Khởi tạo thư mục tạm cho các file code
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Hàm xóa file sau khi sử dụng xong
const cleanupFiles = (files) => {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
};

// Hàm thực thi code trong Docker container
const executeInContainer = async (code, input, timeoutMs = 5000) => {
  // Tạo files tạm thời
  const id = uuidv4();
  const codePath = path.join(tempDir, `${id}.py`);
  const inputPath = path.join(tempDir, `${id}_input.txt`);
  const outputPath = path.join(tempDir, `${id}_output.txt`);
  // Thêm đoạn này vào hàm executeInContainer
container.attach({stream: true, stdout: true, stderr: true}, function(err, stream) {
  container.modem.demuxStream(stream, process.stdout, process.stderr);
});
  // Ghi code và input vào file
  fs.writeFileSync(codePath, code);
  if (input) fs.writeFileSync(inputPath, input);
  
  try {
    // Cấu hình container
    const container = await docker.createContainer({
      Image: 'python:3.9-slim',
      Cmd: ['bash', '-c', `python /code/script.py < /code/input.txt > /code/output.txt 2>&1`],
      HostConfig: {
        Binds: [
          `${codePath}:/code/script.py:ro`,
          `${inputPath}:/code/input.txt:ro`,
          `${outputPath}:/code/output.txt:rw`
        ],
        Memory: 100 * 1024 * 1024, // 100MB memory limit
        CpuPeriod: 100000,
        CpuQuota: 50000, // 50% of CPU
        NetworkMode: 'none',    // Không có kết nối mạng
        ReadonlyRootfs: true,   // Filesystem chỉ đọc
        AutoRemove: false        // Tự động xóa container sau khi chạy xong
      }
    });
    
    // Chạy container
    await container.start();
    
    // Set timeout để kill container nếu chạy quá lâu
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Code execution timed out')), timeoutMs);
    });
    
    // Đợi container chạy xong
    const executionPromise = new Promise((resolve) => {
      container.wait({condition: 'next-exit'},(err, data) => {
        if (err) {
          resolve({ error: err.message });
        } else if (data.StatusCode !== 0) {
          // Code lỗi
          if (fs.existsSync(outputPath)) {
            const error = fs.readFileSync(outputPath, 'utf8');
            resolve({ error });
          } else {
            resolve({ error: `Code exited with status ${data.StatusCode}` });
          }
        } else {
          // Code chạy thành công
          if (fs.existsSync(outputPath)) {
            const output = fs.readFileSync(outputPath, 'utf8');
            resolve({ output: output.trim() });
          } else {
            resolve({ output: '' });
          }
        }
      });
    });
    
    // Chạy với timeout
    return await Promise.race([executionPromise, timeoutPromise]);
  } catch (error) {
    return { error: error.message };
  } finally {
    // Dọn dẹp các file
    cleanupFiles([codePath, inputPath, outputPath]);
  }
};

// Khởi tạo worker để xử lý các công việc trong queue
const worker = new Worker('code-execution', async job => {
  const { code, testCases, userId, lessonId } = job.data;
  
  // Thực thi từng test case
  const results = await Promise.all(testCases.map(async testCase => {
    try {
      const result = await executeInContainer(code, testCase.input);
      
      if (result.error) {
        return {
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: `Lỗi: ${result.error}`,
          passed: false,
          error: result.error
        };
      }
      
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: result.output,
        passed: result.output.trim() === testCase.expectedOutput.trim()
      };
    } catch (error) {
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: `Lỗi xử lý: ${error.message}`,
        passed: false,
        error: error.message
      };
    }
  }));
  console.log(`Executing test case: ${JSON.stringify(testCase)}`);
console.log(`Created container with ID: ${id}`);
console.log(`Container execution complete, results: ${JSON.stringify(result)}`);
  // Tính toán kết quả cuối cùng
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const score = (passedTests / totalTests) * 100;
  
  // Cố gắng lưu kết quả vào database
  try {
    const StudentSubmission = require('../models/StudentSubmission');
    
    // Lưu kết quả làm bài của sinh viên
    await new StudentSubmission({
      userId,
      lessonId,
      code,
      results,
      score,
      submittedAt: new Date()
    }).save();
  } catch (error) {
    console.error('Error saving submission:', error);
  }
  
  // Trả về kết quả để lưu trong job
  return {
    results,
    summary: {
      totalTests,
      passedTests,
      score
    }
  };
}, {
  connection: {
    host: config.redis.host,
    port: config.redis.port
  },
  concurrency: 5  // Số lượng công việc được xử lý đồng thời
});

// Xử lý sự kiện từ worker
worker.on('completed', (job) => {
  console.log(`Job ${job.id} hoàn thành thành công`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} thất bại với lỗi:`, err);
});