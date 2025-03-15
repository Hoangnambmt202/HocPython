const Course = require("../models/Course");
const Chapter = require("../models/Chapter");
const Lesson = require("../models/Lesson");
const slugify = require("slugify");

// Tạo khóa học
const createCourse = async (data) => {
  try {
  
   
    if (data.title) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }

    // Tạo khóa học trước
    const newCourse = new Course({
      title: data.title,
      slug : data.slug,
      description: data.description,
      lecturerId: data.lecturerId,
      categoryId: data.categoryId,
      price: data.price,
      discountPrice: data.discountPrice,
      thumbnail: data.thumbnail,
      isPublished: data.isPublished
    });

    await newCourse.save();

    // Tạo danh sách chương (Chapters)
    const newChapters = await Promise.all(
      data.content.map(async (chapter) => {
        if (!chapter.title) throw new Error("Thiếu tiêu đề chương");

        const newChapter = new Chapter({
          courseId: newCourse._id,
          title: chapter.title,
          lessons: []
        });

        // Tạo danh sách bài học (Lessons)
        const newLessons = await Promise.all(
          chapter.lessons.map(async (lesson) => {
            if (!lesson.title) throw new Error("Thiếu tiêu đề bài học");

            const newLesson = new Lesson({ 
              title: lesson.title,
              videoUrl: lesson.videoUrl,
              description: lesson.description,
              duration: lesson.duration,
              theory: lesson.theory,
              quiz: lesson.quiz,
              chapterId: newChapter._id,
              courseId: newCourse._id
            });

            return (await newLesson.save())._id;
          })
        );

        newChapter.lessons = newLessons;
        await newChapter.save();

        return newChapter._id;
      })
    );

    // Cập nhật danh sách chương vào khóa học
    newCourse.content = newChapters;
    await newCourse.save();

    return newCourse;
  } catch (error) {
    console.error("❌ Lỗi trong CourseService:", error);
    throw error;
  }
}

// Lấy tất cả khóa học
const getAllCourses = async () => {
  try {
    const courses = await Course.find()
    .populate("lecturerId", "name")
    .populate("categoryId", "name")
    .populate({
      path: "content", // Đây là trường chứa các Chapter
      populate: {
        path: "lessons", // Đây là trường chứa các Lesson trong Chapter
        select: "title videoUrl description duration" // Chọn các trường bạn muốn lấy từ Lesson
      }
    });
    
  

    const totalCourses = await Course.countDocuments();
    return {
      status: "success",
      message: "Danh sách khóa học",
      data: courses,
      total: totalCourses,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Lỗi khi lấy danh sách khóa học",
      error: error.message,
    };
  }
};

// Lấy khóa học theo slug
const getCourseBySlug = async (slug) => {
  try {
    const course = await Course.findOne({ slug }).populate("lecturerId", "name");

    if (!course) {
      return {
        status: "error",
        message: "Khóa học không tồn tại",
        data: null,
      };
    }

    return {
      status: "success",
      message: "Thông tin khóa học",
      data: course,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Lỗi khi lấy khóa học",
      error: error.message,
    };
  }
};
  // Cập nhật khóa học
const updateCourse = async (courseId, data) => {
  
      try {
        const updateCourse = await Course.findByIdAndUpdate(courseId, data,{new: true})
        return  {
          status: "success",
          message: "Cập nhật khóa học thành công",
          data: updateCourse,
        }
      }
      catch (error) {
        console.log(error)
        
      }
    
  
};
const deleteCourse = async (courseId) => {
  
  try {
    const updateCourse = await Course.findByIdAndDelete(courseId)
    return  {
      status: "success",
      message: "Xóa khóa học thành công",
    
    }
  }
  catch (error) {
    console.log(error)
    
  }


};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
};
