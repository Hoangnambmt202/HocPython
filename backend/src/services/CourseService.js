const Course = require("../models/Course");
require("../models/Chapter"); 
const slugify = require("slugify");

// Tạo khóa học
const createCourse = async (data) => {
  try {
  
  
    const slug = slugify(data.title, { lower: true, strict: true });
    const newCourse = new Course({
      title: data.title,
      slug,
      description: data.description,
      lecturerId: data.lecturerId,
      price: data.price,
      discountPrice: data.discountPrice,
      thumbnail: data.thumbnail || "/src/assets/imgs/default-thumbnail.jpg",
      categoryId: data.categoryId,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
      isPublished: data.isPublished
    });

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
    .populate({path: "content", populate: {path: "lessons", select: "title videoUrl description duration theory"}});
    const totalCourses = await Course.countDocuments();
    return {
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
    const course = await Course.findOne({ slug })
    .populate("lecturerId", "name")
    .populate("categoryId", "name")
    .populate({
      path: "content", // Đây là trường chứa các Chapter
      populate: {
        path: "lessons", // Đây là trường chứa các Lesson trong Chapter
        select: "title videoUrl description duration" // Chọn các trường bạn muốn lấy từ Lesson
      }
    });

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

  const updateCourse = async (courseId, data) => {
    try {
      console.log("📥 Dữ liệu nhận từ frontend:", data);
  
      // Cập nhật khóa học
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          title: data.title,
          description: data.description,
          lecturerId: data.lecturerId,
          categoryId: data.categoryId,
          price: data.price,
          isPublished: data.isPublished,
          thumbnail: data.thumbnail,
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedCourse) {
        return { status: "error", message: "Không tìm thấy khóa học!" };
      }
      console.log(data.content)
      // 📌 **Cập nhật Chapter**
      // for (const chapterData of data.content) {
      //   let updatedChapter;
  
      //   if (chapterData._id) {
      //     // Cập nhật chapter nếu đã có _id
      //     updatedChapter = await Chapter.findByIdAndUpdate(
      //       chapterData._id,
      //       { title: chapterData.title },
      //       { new: true }
      //     );
      //   } 
      //   // 📌 **Cập nhật Lesson trong từng Chapter**
      //   for (const lessonData of chapterData.lessons) {
      //     if (lessonData._id) {
      //       // Cập nhật lesson nếu đã có _id
      //       await Lesson.findByIdAndUpdate(
      //         lessonData._id,
      //         {
      //           title: lessonData.title,
      //           videoUrl: lessonData.videoUrl,
      //           description: lessonData.description,
      //           duration: lessonData.duration,
      //           theory: lessonData.theory,
      //         },
      //         { new: true }
      //       );
      //     }
      //   }
  
      //   await updatedChapter.save();
      // }
  
      // Lưu lại khóa học sau khi cập nhật danh sách chương
      await updatedCourse.save();
  
      return {
        status: "success",
        message: "Cập nhật khóa học thành công!",
        data: updatedCourse,
      };
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật khóa học:", error);
      return { status: "error", message: "Lỗi khi cập nhật khóa học" };
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
