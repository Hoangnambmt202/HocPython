import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: null,
  loading: false,
  error: null,
  progress: {},
};

const courseContentSlice = createSlice({
  name: 'courseContent',
  initialState,
  reducers: {
    fetchContentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setContent: (state, action) => {
      state.loading = false;
      state.content = action.payload;
    },
   
    updateProgress: (state, action) => {
      const { courseId, lessonId } = action.payload;
      if (!state.progress[courseId]) {
        state.progress[courseId] = [];
      }
      if (!state.progress[courseId].includes(lessonId)) {
        state.progress[courseId].push(lessonId);
      }
    },
  },
});

export const { fetchContentStart, setContent, fetchContentFailure, updateProgress } = courseContentSlice.actions;
export default courseContentSlice.reducer;
