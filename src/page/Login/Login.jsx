import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountExistsError, setAccountExistsError] = useState(null);
  const [role, setRole] = useState("ceo");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);

  const emailRegex =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  // ✅ Validate form
  function validate(values) {
    const errors = {};

    if (!values.email) errors.email = "Email is required";
    else if (!emailRegex.test(values.email)) errors.email = "Email is invalid";

    if (!values.password) errors.password = "Password is required";
    else if (!passwordRegex.test(values.password))
      errors.password =
        "Password must be at least 8 chars with upper, lower, number & special";

    return errors;
  }

  // ✅ Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: loginUser,
  });

  // ✅ Send data to backend
  async function loginUser(values) {
    const loadingToastId = toast.loading("Please wait...");

    try {
      // اختيار المسار حسب نوع المستخدم
      let endpoint = "";
      if (role === "ceo") endpoint = "/api/v1/ceo/login";
      else if (role === "employee") endpoint = "/api/v1/employee/login";
      else if (role === "traffic") endpoint = "/api/v1/traffic-officer/login";

      const { email, password } = values;
      const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, {
        email,
        password,
      });
      console.log(response.data);
      toast.success(`${role.toUpperCase()} registered successfully`);
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("role", role);
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setAccountExistsError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  return (
    <div className="relative h-screen my-auto pt-20 block">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
      >
        <source src="/video/Backgroundweb.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-5"></div>

      <div className="container mx-auto relative flex h-fit items-center justify-center">
        <div className="relative grid h-fit overflow-hidden mt-10 w-[80%] mx-10 grid-cols-12 md:grid-cols-6 bg-black/10 shadow-md shadow-primary-400">
          <div className="col-span-12 md:col-span-6 my-4 px-2 h-[90%]">
            <div className="lg:px-11 md:px-5 px-4 sm:px-10 flex items-center space-y-3 justify-center flex-col h-full">
              <div className="flex items-center justify-center flex-col gap-2">
                <img
                  src="/images/OzirixPng2.png"
                  alt="logo"
                  className="w-50 h-45"
                />
                <h1 className="text-white text-xl font-semibold text-center">
                  Welcome Back!{" "}
                  <span>
                    <i className="fa-regular fa-circle-user"></i>
                  </span>
                </h1>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="space-y-3 w-full gap-x-2 text-white grid grid-cols-12"
              >
                {/* Role Field */}
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="col-span-12 w-full rounded-lg bg-primary-600 text-white focus:outline-none"
                >
                  <option value="ceo">CEO</option>
                  <option value="employee">Employee</option>
                  <option value="traffic">Traffic Officer</option>
                </select>

                {/* Email Field */}
                <div className="email bg-primary-600 px-3 py-3 rounded-lg col-span-12">
                  <input
                    type="email"
                    autoComplete="off"
                    placeholder="Enter your email"
                    className="w-full focus:outline-0 bg-transparent placeholder:text-white"
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

                {/* Password Field */}
                <div className="password relative bg-primary-600 px-3 py-3 rounded-lg col-span-12">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Enter your password"
                    className="w-full focus:outline-0 bg-transparent placeholder:text-white"
                    name="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className={
                      showPassword
                        ? "fa-solid fa-eye absolute top-[50%] right-[10px] -translate-y-[50%] cursor-pointer"
                        : "fa-solid fa-eye-slash absolute top-[50%] right-[10px] -translate-y-[50%] cursor-pointer"
                    }
                  ></i>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="text-gray-50 col-span-12 font-semibold">
                    *{formik.errors.password}
                  </p>
                )}

                {/* Backend error message */}
                {loginError && (
                  <p className="text-red-400 col-span-12 font-semibold text-center">
                    *{loginError}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="col-span-12 bg-primary-300 hover:bg-primary-600 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700 w-full rounded-lg"
                >
                  Login
                </button>

                <p className="text-white text-sm col-span-12 text-center font-normal">
                  Don’t have an account?{" "}
                  <span className="text-blue-500">
                    <Link to={`/signup`}>
                      Sign Up <i className="fa-solid fa-angle-right"></i>
                    </Link>
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
