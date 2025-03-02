
import AdminLayout from "../layouts/AdminLayout";
import CoursesLayout from "../layouts/CoursesLayout";
import LearningLayout from "../layouts/LearningLayout";
import MainLayout from "../layouts/MainLayout";
import CourseManagement from "../pages/Admin/CoursesManagement";
import Dashboard from "../pages/Admin/Dashboard";
import ManageStudents from "../pages/Admin/StudentsManagement";
import HomePage from "../pages/HomePage/HomePage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import MyCoursesPage from "../pages/MyCoursesPage/MyCoursesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import LessonManagement from "../pages/Admin/LessonManagement";
import SettingsManagement from "../pages/Admin/SettingsManagement";
import LoginAdmin from "../pages/Admin/LoginAdmin";
import StatisticManagement from "../pages/Admin/StatisticManagement";
import PaymentMethods from "../pages/Admin/PaymentMethods";
import AdminProfile from "../pages/Admin/AdminProfile";
import LecturersManagement from "../pages/Admin/LecturersManagement";
import CoursePage from "../pages/CoursePage/CoursePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import PaymentSuccess from "../pages/CheckoutPage/PaymentSuccess";
import PaymentFailure from "../pages/CheckoutPage/PaymentFailure";
import PaymentHistory from "../pages/Admin/PaymentHistory";
import PaymentRefund from "../pages/Admin/PaymentRefund";
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
      },
      {
        path: "/order/payment",
        page: PaymentPage,
      },
      {
        path: "/order/checkout",
        page: CheckoutPage,
      }
    ]
  },
  {
    path: "/order/success",
    page: PaymentSuccess,
  },
  {
    path: "/order/failure",
    page: PaymentFailure,
  }
,
  {
    path: "*",
    page: NotFoundPage,
    
  },
  {
    path: "/course",
    layout: CoursesLayout,
    children: [
      {
        path: "",
        page: CoursePage,
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
    path: "/admin/login",
    page: LoginAdmin,
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
        path: "profile",
        page: AdminProfile,
      },
      {
        path: "courses",
        page: CourseManagement,
      },
      {
        path: "students",
        page: ManageStudents,
      },
      {
        path: "lecturers",
        page: LecturersManagement,
      },
      {
        path: "lessons",
        page: LessonManagement,
      },
      {
        path: "payment/history",
        page: PaymentHistory,
      
      },
      {
        path: "payment/methods",
        page: PaymentMethods,
      },
      {
        path: "payment/refunds",
        page: PaymentRefund,
      },
      {
        path: "statistic",
        page: StatisticManagement,
      },
      {
        path: "settings",
        page: SettingsManagement,
      }
      
    ]
  }
 
];
export default routes;
