import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/userSlides";
import cartReducer from "./slides/cartSlides";
import progressReducer from "./slides/progressSlice";
import enrollmentReducer from "./slides/enrollSlice";
import courseContentReducer from "./slides/courseContentSlices"
import courseReducer from "./slides/coursesSlices";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    enrollment: enrollmentReducer,
    progress: progressReducer,
    courseContent: courseContentReducer,
    course : courseReducer,
  },
});

export default store;
