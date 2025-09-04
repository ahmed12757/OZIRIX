import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Signup from "./page/Signup/Signup";
import Login from "./page/Login/Login";

import ResetPassword from "./page/ResetPassword/ResetPassword";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import VerifyCode from "./page/VerifyCode/VerifyCode";
import Loader from "./components/Loading/Loading";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // ✅ الصفحات المفتوحة للجميع

        { index: true, element: <Login /> },

        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "verify", element: <VerifyCode /> },

        // 🔒 الصفحات المحمية (لازم Token)
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
