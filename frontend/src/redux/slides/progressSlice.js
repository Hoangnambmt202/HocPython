import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessonProgress: {},  // Lưu tiến độ từng bài học
  lastLesson: null,    // Lưu bài học cuối cùng
  loading: false,
  error: null,
  courseProgress: {    // Thêm state cho tiến độ khóa học
    progress: 0,
    totalLessons: 0,
    completedLessons: 0
  }
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Cập nhật tiến độ cho một bài học
    updateLessonProgress: (state, action) => {
      const { lessonId, completed, courseId } = action.payload;
      if (!state.lessonProgress[courseId]) {
        state.lessonProgress[courseId] = {};
      }
      state.lessonProgress[courseId][lessonId] = {
        completed,
        timestamp: new Date().toISOString()
      };
    },
    // Lưu bài học cuối cùng
    setLastLesson: (state, action) => {
      const { slug, lessonId, chapterId } = action.payload;
      state.lastLesson = {
        slug,
        lessonId,
        chapterId,
        timestamp: new Date().toISOString()
      };
    },
    // Reset tiến độ
    resetProgress: (state) => {
      state.lessonProgress = {};
      state.lastLesson = null;
    },
    // Cập nhật tiến độ khóa học
    updateCourseProgress: (state, action) => {
      const { progress, totalLessons, completedLessons } = action.payload;
      state.courseProgress = {
        progress,
        totalLessons,
        completedLessons
      };
    }
  },
});

export const {
  setLoading,
  setError,
  updateLessonProgress,
  setLastLesson,
  resetProgress,
  updateCourseProgress
} = progressSlice.actions;

export default progressSlice.reducer;
