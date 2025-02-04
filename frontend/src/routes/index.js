

import HomePage from "../pages/HomePage/HomePage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
 
  {
    path: "/learning",
    page: LearningPage,
    isShowHeader: false,
  }
 
];
export default routes;
