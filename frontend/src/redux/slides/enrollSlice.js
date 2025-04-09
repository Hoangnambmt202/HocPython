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
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
  

  },
});

export const { enrollCourseStart, setEnrolledCourses, enrollCourseFailure, resetEnrollmentState, setEnroll } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;
