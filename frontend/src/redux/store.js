import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/userSlides";
import cartReducer from "./slides/cartSlides";
import progressReducer from "./slides/progressSlice";
import enrollmentReducer from "./slides/enrollSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    enrollment: enrollmentReducer,
    progress: progressReducer,
  },
});

export default store;
