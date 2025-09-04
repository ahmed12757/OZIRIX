import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const [accountExisstError, setaccountExisstError] = useState(null);
  const emailRiges =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  function validate(values) {
    const errors = {};
    if (values.name === "") {
      errors.name = "name is required";
    } else if (values.name.length < 3) {
      errors.name = " Name must be at least 3 characters ";
    } else if (values.name.length > 20) {
      errors.name = "Name can be not more than 20 characters";
    }

    if (values.email === "") {
      errors.email = "email is required";
    } else if (!emailRiges.test(values.email)) {
      errors.email = "email is not valid";
    }

    if (values.password === "") {
      errors.password = " password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "password | Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character";
    }

    if (values.rePassword === "") {
      errors.rePassword = " confirm password is required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = " password & confirm rePassword should be the same ";
    }

    return errors;
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: function (values) {
      senddata(values);
      console.log(values);
    },
    validate,
  });
  async function senddata(values) {
    const lodingToastId = toast.loading("waiting...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "success") {
        toast.success("user created Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setaccountExisstError(error.response.data.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <div className="relative h-screen my-auto pt-20  block">
      <Helmet>
        <title> SignUp </title>
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

      <div className=" container  mx-auto relative flex  h-fit items-center justify-center">
        <div className="relative grid h-fit overflow-hidden  mx-10  grid-cols-12 md:grid-cols-6 bg-black/10 shadow-md shadow-primary-400 ">
          <div className=" col-span-12 md:col-span-6 my-4 px-2 h-[90%]">
            <div className="lg:px-11 md:px-5 px-4 sm:px-10  flex items-center space-y-3 justify-center flex-col h-full">
              <div className="flex items-center  justify-center flex-col gap-2">
                <img
                  src="/images/OzirixPng2.png"
                  alt="logo"
                  className="w-50 h-45"
                />
                <h1 className="text-white text-xl font-semibold text-center">
                  Create My Account!{" "}
                  <span className="">
                    <i class="fa-regular fa-circle-user"></i>
                  </span>
                </h1>
              </div>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className=" space-y-3 w-full gap-x-2 text-white grid grid-cols-12 "
              >
                <div className="username bg-primary-600 px-3 py-3 rounded-lg col-span-12  ">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your name"
                    className="w-full focus:outline-0 !bg-transparent focus:!bg-transparent focus:border-0 placeholder:text-white"
                    name="name"
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.errors.name && formik.touched.name && (
                  <p className="text-gray-50 col-span-12 font-semibold">
                    *{formik.errors.name}
                  </p>
                )}
                <div className="email bg-primary-600 px-3 py-3 rounded-lg col-span-12  ">
                  <input
                    type="email"
                    autoComplete="off"
                    placeholder="Enter your email"
                    className="w-full focus:outline-0 !bg-transparent focus:!bg-transparent focus:border-0 placeholder:text-white"
                    name="email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <p className="text-gray-50 col-span-12 font-semibold">
                    *{formik.errors.email}
                  </p>
                )}
                {accountExisstError && (
                  <p className="text-gray-50 col-span-12 font-semibold">
                    *{accountExisstError}
                  </p>
                )}
                <div className="password relative bg-primary-600 px-3 py-3 rounded-lg col-span-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="password"
                    className="w-full focus:outline-0 !bg-transparent focus:!bg-transparent focus:border-0 placeholder:text-white"
                    name="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className={
                      showPassword
                        ? `fa-solid fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer`
                        : `fa-solid fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer `
                    }
                  ></i>
                </div>

                <div className="re-password relative bg-primary-600 px-2 py-3 rounded-lg col-span-6 ">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="confirm"
                    className="w-full focus:outline-0 !bg-transparent focus:!bg-transparent focus:border-0 placeholder:text-white"
                    name="rePassword"
                    onBlur={formik.handleBlur}
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className={
                      showPassword
                        ? `fa-solid fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer`
                        : `fa-solid fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer `
                    }
                  ></i>
                </div>
                <div className=" col-span-6 ">
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-gray-50  font-semibold">
                      *{formik.errors.password}
                    </p>
                  )}
                </div>

                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="text-gray-50 col-span-6 font-semibold">
                    *{formik.errors.rePassword}
                  </p>
                )}

                <button
                  type=" submit "
                  className="col-span-12 bg-primary-300 hover:bg-primary-600 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700  w-full rounded-lg"
                >
                  Signup
                </button>
                <p className="col-span-12 text-white font-[400] text-[12px] text-center ">
                  This site is protected by reCAPTCHA and the Google Privacy
                  Policy and Terms of Service apply.
                </p>
                <p className="text-white text-sm col-span-12 text-center font-normal ">
                  Already a member?{" "}
                  <span className="text-blue-500 ">
                    {" "}
                    <Link to={`/login`}>
                      Log In <i class="fa-solid fa-angle-right"></i>
                    </Link>{" "}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
