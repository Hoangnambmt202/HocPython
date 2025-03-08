import { createSlice } from "@reduxjs/toolkit";

const initialEnrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    enrolledCourses: Array.isArray(initialEnrolledCourses) ? initialEnrolledCourses : [], // Đảm bảo là mảng
    isOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingCourse = state.cart.find((item) => item._id === action.payload._id);

      if (!existingCourse) {
        state.cart.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },

    enrollCourse: (state, action) => {
      if (!Array.isArray(state.enrolledCourses)) {
        state.enrolledCourses = []; // Đảm bảo enrolledCourses là mảng
      }

      const existingCourse = state.enrolledCourses.find(course => course._id === action.payload._id);

      if (!existingCourse) {
        state.enrolledCourses.push(action.payload);
        localStorage.setItem("enrolledCourses", JSON.stringify(state.enrolledCourses));
      }
    },

    unenrollCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(course => course._id !== action.payload);
      localStorage.setItem("enrolledCourses", JSON.stringify(state.enrolledCourses));
    },
  },
});

export const { addToCart, removeFromCart, toggleCart, closeCart, enrollCourse, unenrollCourse } = cartSlice.actions;
export default cartSlice.reducer;
