import { createSlice } from "@reduxjs/toolkit";

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: {
    enrolledCourses: [], // Danh sách khóa học đã đăng ký
    loading: false,
    error: null,
  },
  reducers: {
    enrollCourseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    enrollCourseSuccess: (state, action) => {
      state.loading = true;
      state.enrolledCourses.push(action.payload);
      localStorage.setItem("enrolledCourses", JSON.stringify(state.enrolledCourses)); // Lưu vào localStorage
    },
    enrollCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetEnrollmentState: (state) => {
      state.enrolledCourses = [];
      state.loading = false;
      state.error = null;
   

    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
  },
});

export const { enrollCourseStart, enrollCourseSuccess, enrollCourseFailure, resetEnrollmentState, setEnrolledCourses } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;
