
import AdminLayout from "../layouts/AdminLayout";
import CoursesLayout from "../layouts/CoursesLayout";
import LearningLayout from "../layouts/LearningLayout";
import MainLayout from "../layouts/MainLayout";
import CourseManagement from "../pages/Admin/CoursesManagement";
import Dashboard from "../pages/Admin/Dashboard";
import ManageStudents from "../pages/Admin/StudentsManagement";
import HomePage from "../pages/HomePage/HomePage";
import LearningPage from "../pages/LearningPage/LearningPage";
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
import StudentProgressAdmin from "../pages/Admin/StudentProgressManagement";
import CartPage from "../pages/CartPage/CartPage";
import CategoriesManagement from "../pages/Admin/CategoriesManagement";
import ChaptersManagement from "../pages/Admin/ChaptersManagement";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import AdminNotificationPage from "../pages/Admin/AdminNotificationPage";

import routeConfig from "../configs/routes";
const routes = [
  {
   
    layout: MainLayout,
    children:[
      {
        path: routeConfig.home,
        page: HomePage
      },
      {
        path: routeConfig.profile,
        page: ProfilePage,
      },
      {
        path: routeConfig.myCourses,
        page: MyCoursesPage,
      },
      {
        path: routeConfig.cart,
        page: CartPage,
      },
      {
        path: routeConfig.payment,
        page: PaymentPage,
      },
      {
        path: routeConfig.checkout,
        page: CheckoutPage,
      },
      {
        path: routeConfig.notifications,
        page: NotificationPage,
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
    path: "/course",
    layout: CoursesLayout,
    children: [
      {
        path: ":slug",
        page: CoursePage,
      },
    ]
  },
  {
  
    layout: LearningLayout,
    children:[
      {
        path: "course/:slug/learn",
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
        path: "chapters",
        page: ChaptersManagement,
      },
      {
        path: "categories",
        page: CategoriesManagement,
      },
      {
        path: "students",
        page: ManageStudents,
      },
      {
        path: "students/progress",
        page: StudentProgressAdmin
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
        path: "notifications",
        page: AdminNotificationPage,
      },
      {
        path: "settings",
        page: SettingsManagement,
      }
      
    ]
  },
  {
    path: "*",
    page: NotFoundPage,
    
  },
];

export default routes;
