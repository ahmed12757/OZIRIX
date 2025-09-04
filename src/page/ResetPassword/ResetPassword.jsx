import axios from "axios";

import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Login() {
  const [shownewPassword, setShownewPassword] = useState(false);
  const togglenewPasswordVisibility = () => {
    setShownewPassword(!shownewPassword);
  };

  const navigate = useNavigate();
  const [accountExisstError, setaccountExisstError] = useState(null);
  const emailRiges =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  const newPasswordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  function validate(values) {
    const errors = {};

    if (values.email === "") {
      errors.email = "email is required";
    } else if (!emailRiges.test(values.email)) {
      errors.email = "email is not valid";
    }

    if (values.newPassword === "") {
      errors.newPassword = " newPassword is required";
    } else if (!newPasswordRegex.test(values.newPassword)) {
      errors.newPassword =
        "newPassword | Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character";
    }

    return errors;
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: function (values) {
      senddata(values);
    },

    validate,
  });
  async function senddata(values) {
    const lodingToastId = toast.loading("waiting...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      localStorage.setItem("token", data.token);
      toast.success("reset password successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <div className="relative h-screen my-auto pt-20 block  ">
      <Helmet>
        <title> Reset Password </title>
      </Helmet>
      <video
        className=" absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
      >
        <source src="/video/Backgroundweb.mp4" type="video/mp4" />
      </video>
      <div className=" absolute top-0 left-0 w-full h-full bg-black/60 -z-5 "></div>

      <div className=" container  mx-auto relative flex  h-screen items-center justify-center   ">
        <div className=" relative grid h-fit overflow-hidden  mx-10  grid-cols-12 md:grid-cols-6 bg-black/10  shadow-md shadow-primary-400">
          <div className="col-span-12 md:col-span-6 my-4 px-2 h-[90%]">
            <div className="lg:px-12 md:px-8 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
              <div className="flex items-center  justify-center flex-col gap-2">
                <h1 className="text-white text-xl font-semibold text-center">
                  Create New password
                </h1>
                <p className="text-white text-center">
                  This password should be different from the previous password.
                </p>
              </div>
              <form
                action=""
                className=" space-y-3 w-full text-white "
                onSubmit={formik.handleSubmit}
              >
                <div className="email bg-primary-600 px-4 py-3 rounded-lg ">
                  <input
                    autoComplete="off"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full focus:outline-0 !bg-transparent focus:!bg-transparent focus:border-0 placeholder:text-white"
                    name="email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <p className="text-white font-semibold">
                    *{formik.errors.email}
                  </p>
                )}
                {accountExisstError && (
                  <p className="text-white font-semibold">
                    *{accountExisstError}
                  </p>
                )}
                <div className="newPassword relative bg-primary-600 px-4 py-3 rounded-lg">
                  <input
                    autoComplete="off"
                    type={shownewPassword ? "text" : "Password"}
                    placeholder="New Password"
                    className="w-full focus:outline-0 bg-transparent focus:border-0 placeholder:text-white"
                    name="newPassword"
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                  />
                  <i
                    onClick={togglenewPasswordVisibility}
                    className={
                      shownewPassword
                        ? `fa-solid fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer`
                        : `fa-solid fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer `
                    }
                  ></i>
                </div>
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-white font-semibold">
                    *{formik.errors.newPassword}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <Link
                    to={`/forgotPassword`}
                    className="bg-primary-300 mb-0 hover:bg-primary-600 hover:transition hover:duration-300 duration-300 py-1 cursor-pointer px-2 border-[.5px] border-primary-700  w-fit rounded-lg"
                  >
                    {" "}
                    <span>
                      <i class="fa-solid fa-arrow-left"></i>
                    </span>{" "}
                    Back
                  </Link>
                  <button
                    type=" submit "
                    className=" bg-primary-300 mb-0 hover:bg-primary-600 hover:transition hover:duration-300 duration-300 py-1 cursor-pointer px-2 border-[.5px] border-primary-700  w-fit rounded-lg"
                  >
                    Next{" "}
                    <span>
                      <i class="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
