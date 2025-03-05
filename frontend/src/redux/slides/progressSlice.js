import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    progressData: JSON.parse(localStorage.getItem("progress")) || {}, // Lưu tiến độ mỗi khóa học
  },
  reducers: {
    updateProgress: (state, action) => {
      const { courseId, progress } = action.payload;

      // Cập nhật tiến độ khóa học
      state.progressData[courseId] = progress;

      // Lưu vào localStorage để duy trì trạng thái sau khi reload
      localStorage.setItem("progress", JSON.stringify(state.progressData));
    },

    resetProgress: (state, action) => {
      const { courseId } = action.payload;

      // Xóa tiến độ của khóa học cụ thể
      delete state.progressData[courseId];

      // Lưu lại trạng thái vào localStorage
      localStorage.setItem("progress", JSON.stringify(state.progressData));
    },
  },
});

export const { updateProgress, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
