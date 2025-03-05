import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/userSlides";
import cartReducer from "./slides/cartSlides";
import progressReducer from "./slides/progressSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    progress: progressReducer,
  },
});

export default store;
