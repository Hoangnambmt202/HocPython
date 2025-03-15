 Quy trình Quản lý Khóa học, Chương, Bài giảng trên Website Dạy Python
Dưới đây là quy trình quản lý khóa học, bao gồm thêm khóa học, chương học, bài giảng và bài tập quiz. Mô hình này giúp bạn quản lý tiến độ học viên một cách hiệu quả.

📌 Cách thức hoạt động của hệ thống
Hệ thống quản lý khóa học sẽ hoạt động dựa trên mô hình dữ liệu:

Khóa học (Course): Chứa nhiều chương học (Chapter).
Chương học (Chapter): Chứa nhiều bài giảng (Lesson).
Bài giảng (Lesson): Chứa video, giáo trình (Markdown) và bài tập trắc nghiệm (Quiz).
Bài tập trắc nghiệm (Quiz): Mỗi bài học có thể có nhiều câu hỏi với 4 lựa chọn, học viên làm bài và chọn câu trả lời đúng.
Tiến độ học tập (Progress): Lưu bài học đã hoàn thành và % tiến độ của học viên trong khóa học.
Đăng ký học (Enrollment): Lưu thông tin học viên đã mua khóa học.
📌 1. Quy trình tạo khóa học, chương, bài giảng, bài tập
Khi admin tạo một khóa học mới, hệ thống sẽ:
1️⃣ Tạo khóa học (Course).
2️⃣ Tạo từng chương (Chapter) và liên kết với khóa học.
3️⃣ Tạo bài giảng (Lesson) trong chương, có video URL + giáo trình (Markdown) + quiz.
4️⃣ Thêm bài tập Quiz (Quiz) vào từng bài học.
5️⃣ Gán chapterId vào khóa học (tạo mối quan hệ).
6️⃣ Lưu toàn bộ dữ liệu vào MongoDB.

📌 1️⃣ API tạo khóa học (Express.js)
Tạo API trong courseController.js để xử lý việc thêm khóa học kèm theo chương và bài học.

File: controllers/courseController.js
js
Copy
Edit
const CourseService = require("../services/courseService");

const CourseController = {
  /**
   * API: Tạo khóa học mới (kèm Chương + Bài học)
   */
  async createCourse(req, res) {
    try {
      const course = await CourseService.createCourse(req.body);
      res.status(201).json({ success: true, message: "Tạo khóa học thành công!", course });
    } catch (error) {
      console.error("Lỗi khi tạo khóa học:", error);
      res.status(500).json({ status: "error", message: "Lỗi khi tạo khóa học", error });
    }
  }
};

module.exports = CourseController;
📌 2️⃣ Xử lý dữ liệu trong courseService.js
Tạo khóa học trước, sau đó tạo các chương (Chapter).
Sau đó, mỗi chương sẽ chứa danh sách bài giảng (Lesson).
Khi hoàn tất, cập nhật lại course.content để liên kết với các chương.
File: services/courseService.js
js
Copy
Edit
const Course = require("../models/Course");
const Chapter = require("../models/Chapter");
const Lesson = require("../models/Lesson");

const CourseService = {
  /**
   * Tạo khóa học mới
   */
  async createCourse(data) {
    try {
      const { content, ...courseData } = data;

      // 1. Tạo khóa học trước
      const newCourse = new Course(courseData);
      await newCourse.save();

      // 2. Tạo các chương (Chapters)
      const newChapters = await Promise.all(
        content.map(async (chapter) => {
          const newChapter = new Chapter({
            courseId: newCourse._id,
            title: chapter.title,
            lessons: []
          });

          // 3. Tạo các bài học trong từng chương
          const newLessons = await Promise.all(
            chapter.lessons.map(async (lesson) => {
              const newLesson = new Lesson({ ...lesson, chapterId: newChapter._id, courseId: newCourse._id });
              return (await newLesson.save())._id;
            })
          );

          newChapter.lessons = newLessons;
          await newChapter.save();
          return newChapter._id;
        })
      );

      newCourse.content = newChapters;
      await newCourse.save();

      return newCourse;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = CourseService;
📌 3. Quy trình thêm khóa học
1️⃣ Admin tạo khóa học mới bằng cách điền tiêu đề, mô tả, giảng viên, giá cả....
2️⃣ Khi nhấn Thêm khóa học, React gửi dữ liệu lên API /api/courses (POST).
3️⃣ Backend xử lý:

Tạo khóa học mới.
Thêm các chương học vào Chapter.js và liên kết với khóa học.
Thêm bài giảng (Lesson.js) vào từng chương.
Nếu bài học có quiz, lưu danh sách câu hỏi quiz vào Quiz.js.
Cập nhật progress nếu có học viên đã học khóa này.
Hiển thị tiến độ học tập:
Khi học viên học bài, nếu ấn "Hoàn thành bài học", gọi API /api/progress/update để cập nhật progress.
Học viên tiếp tục học từ bài cuối cùng đã hoàn thành.
📌 4. Tổng kết
✔ Tạo khóa học gồm nhiều chương và bài học.
✔ Hỗ trợ Markdown Editor cho giáo trình lý thuyết.
✔ **Hỗ trợ tạo bài tập quiz cho mỗi bài học.
✔ Tự động cập nhật tiến độ học viên khi hoàn thành bài học.