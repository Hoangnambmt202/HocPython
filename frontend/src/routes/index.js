
import CartPage from "../pages/CartPage/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import ContactPage from "../pages/ContactPage";
import FashionCollectionPage from "../pages/FashionCollectionPage/FashionCollectionPage";
import HomePage from "../pages/HomePage/HomePage";
import NewArrivalsPage from "../pages/NewArrivalsPage/NewArrivalsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductsPage";
import UserPage from "../pages/UserPage/UserPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";


const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/contact",
    page: ContactPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
  {
    path: "/new-arrivals",
    page: NewArrivalsPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "/collection",
    page: FashionCollectionPage,
    isShowHeader: true,
  },
  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "/checkout",
    page: CheckoutPage,
    isShowHeader: true,
  },
  {
    path: "/user",
    page: UserPage,
    isShowHeader: true,
  },
  {
    path: "/product-detail",
    page: ProductDetailPage,
    isShowHeader:true,
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
