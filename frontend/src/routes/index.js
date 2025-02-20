
import AdminLayout from "../layouts/AdminLayout";
import CoursesLayout from "../layouts/CoursesLayout";
import LearningLayout from "../layouts/LearningLayout";
import MainLayout from "../layouts/MainLayout";
import CourseManagement from "../pages/Admin/CoursesManagement";
import Dashboard from "../pages/Admin/Dashboard";
import HomePage from "../pages/HomePage/HomePage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import MyCoursesPage from "../pages/MyCoursesPage/MyCoursesPage";
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
      },
      {
        path: "/my-courses",
        page: MyCoursesPage,
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
 
  },
  {
    path: "/admin",
    layout: AdminLayout,
    children:[
      {
        path: "",
        page: Dashboard,
      },
      {
        path: "courses",
        page: CourseManagement,
      }
      
    ]
  }
 
];
export default routes;
