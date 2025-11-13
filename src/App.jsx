import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Signup from "./page/Signup/Signup";
import Login from "./page/Login/Login";
import ResetPassword from "./page/ResetPassword/ResetPassword";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import VerifyCode from "./page/VerifyCode/VerifyCode";
import Home from "./page/Home/Home";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./page/Profile/Profile";
import UpdateProfile from "./page/UpdateProfile/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "signup",
          element: (
            <PublicRoute>
              <Signup />
            </PublicRoute>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          ),
        },
        {
          path: "forgotPassword",
          element: (
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          ),
        },
        {
          path: "verify",
          element: (
            <PublicRoute>
              <VerifyCode />
            </PublicRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "updateProfile",
          element: (
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
