

import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import SignInPage from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";


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
    path: "sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "sign-up",
    page: SignUpPage,
    isShowHeader: false,
  }
 
];
export default routes;
