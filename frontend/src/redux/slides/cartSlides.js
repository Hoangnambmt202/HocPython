import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    isOpen: false, // Trạng thái mở giỏ hàng
  },
  reducers: {
    addToCart: (state, action) => {
      const existingCourse = state.cart.find((item) => item._id === action.payload._id);

      if (!existingCourse) {
        state.cart.push({ ...action.payload });
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
  },
});

export const { addToCart, removeFromCart, toggleCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
