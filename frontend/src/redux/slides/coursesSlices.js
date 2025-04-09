import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  courseDetail: null,
  enrolledCourses: [],
  loadingCourses: false,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCourseDetail: (state, action) => {
      state.courseDetail = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    setLoadingCourses: (state, action) => {
      state.loadingCourses = action.payload;
    },
  },
});

export const { setCourses, setCourseDetail, setEnrolledCourses, setLoadingCourses } = courseSlice.actions;
export default courseSlice.reducer;