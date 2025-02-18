
import CoursesLayout from "../layouts/CoursesLayout";
import LearningLayout from "../layouts/LearningLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const routes = [
  {
   
    layout: MainLayout,
    children:[
      {
        path: "/",
        page: HomePage
      },
      {
        path: "/profile",
        page: ProfilePage,
      }
    ]
  },

  {
    path: "*",
    page: NotFoundPage,
    
  },
  {
  
    layout: CoursesLayout,
    children: [
      {
        path: "/course",
        page: CoursesLayout,
      },
    ]
  },
  {
  
    layout: LearningLayout,
    children:[
      {
        path: "/learning",
        page: LearningPage
      }
    ]
 
  }
 
];
export default routes;
