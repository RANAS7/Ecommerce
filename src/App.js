import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { ProductList } from "../src/features/product-list/components/ProductList";
import Home from "./pages/Home";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Signup from "./features/auth/components/Signup";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./../src/features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { createRoot } from "react-dom/client";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import AdminOrders from "../src/features/admin/components/AdminOrders";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./features/auth/components/Login";
import Cartpage from "./pages/Cartpage";
import UserOrdersPage from "./pages/userOrdersPage";
import Protected from "./features/auth/components/Protected";
import CheckoutPage from "./pages/CheckoutPage";
import Cart from "./features/cart/Cart";
import OrderSuccessPage from "./pages/orderSuccessPage";
import UserProfile from "./features/user/components/userProfile";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "../src/features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import ProductForm from "./features/admin/components/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactPage from "./pages/ContactPage";
import OrderSuccessPageer from "./pages/orderSuccessPageer";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <Cartpage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productform",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productform/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/order-success/:id",
    element: <OrderSuccessPageer />,
  },
  {
    path: "/orders",
    element: (
      <UserOrdersPage></UserOrdersPage>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/profile",
    element: (
      <UserProfilePage />
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/logout",
    element: (
      <Logout />
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPasswordPage />
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/contact",
    element: (
      <ContactPage />
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: "/about",
    element: (
      <About />
      // we will add Page later right now using component directly.
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      {userChecked && (
        <>
          {" "}
          <RouterProvider router={router} />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
