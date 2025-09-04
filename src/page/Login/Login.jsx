import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Login() {
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

    return errors;
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        toast.success("user created Successfully");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setaccountExisstError(error.response.data.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <div className=" relative h-screen my-auto pt-20 block ">
      <video
        className=" absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
      >
        <source src="/video/Backgroundweb.mp4" type="video/mp4" />
      </video>
      <div className=" absolute top-0 left-0 w-full h-full bg-black/60 -z-5 "></div>
      <Helmet>
        <title> Login </title>
      </Helmet>
      <div className=" container mx-auto relative block h-fit items-center justify-center pt-10  ">
        <div className=" relative grid h-fit overflow-hidden  grid-cols-12 md:grid-cols-6 bg-black/10  shadow-md shadow-primary-400 w-full md:w-[70%] mx-auto">
          <div className="col-span-12  md:col-span-6 my-4 px-2 h-[90%]">
            <div className="lg:px-12 md:px-8 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
              <div className="flex items-center  justify-center flex-col gap-2">
                <img
                  src="/images/OzirixPng2.png"
                  alt="logo"
                  className="w-50 h-45"
                />
                <h1 className="text-white text-xl font-semibold text-center">
                  Log in to OZIRIX{" "}
                  <span>
                    <i class="fa-regular fa-circle-user"></i>
                  </span>
                </h1>
              </div>
              <form
                action=""
                className=" space-y-3 w-full text-white grid grid-cols-12 "
                onSubmit={formik.handleSubmit}
              >
                <div className="email bg-primary-600 px-4 py-3 rounded-lg col-span-12">
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
                  <p className="text-white font-semibold grid grid-cols-12">
                    *{formik.errors.email}
                  </p>
                )}
                {accountExisstError && (
                  <p className="text-white font-semibold">
                    *{accountExisstError}
                  </p>
                )}
                <div className="password relative bg-primary-600 px-4 py-3 rounded-lg col-span-12">
                  <input
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full focus:outline-0 bg-transparent focus:border-0 placeholder:text-white"
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
                {formik.errors.password && formik.touched.password && (
                  <p className="text-white font-semibold col-span-12">
                    *{formik.errors.password}
                  </p>
                )}
                <button
                  type=" submit "
                  className=" bg-primary-400 mb-0 hover:bg-primary-600 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700  w-full rounded-lg col-span-12"
                >
                  Login
                </button>
                <Link to={`/forgotPassword`} className="my-3 col-span-12">
                  <p className=" text-blue-500 font-normal text-center text-sm ">
                    Forgot password?
                  </p>
                </Link>
                <div className=" text-center col-span-12">
                  <p className="font-normal text-sm text-white">
                    Not a member yet?{" "}
                    <Link to={`/signup`}>
                      <span className=" text-blue-500 font-normal text-sm">
                        Create Account <i class="fa-solid fa-angle-right"></i>
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
