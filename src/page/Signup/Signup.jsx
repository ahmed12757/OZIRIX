import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountExistsError, setAccountExistsError] = useState(null);
  const [role, setRole] = useState("ceo");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const emailRegex =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  function validate(values) {
    const errors = {};

    if (!values.first_name) errors.first_name = "First name is required";
    else if (values.first_name.length < 3)
      errors.first_name = "Must be at least 3 characters";

    if (!values.last_name) errors.last_name = "Last name is required";
    else if (values.last_name.length < 3)
      errors.last_name = "Must be at least 3 characters";

    if (!values.email) errors.email = "Email is required";
    else if (!emailRegex.test(values.email)) errors.email = "Email is invalid";

    if (!values.password) errors.password = "Password is required";
    else if (!passwordRegex.test(values.password))
      errors.password =
        "Password must be at least 8 chars with upper, lower, number & special";

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: sendData,
  });

  async function sendData(values) {
    const loadingToastId = toast.loading("Please wait...");

    try {
      // اختيار المسار حسب نوع المستخدم
      let endpoint = "";
      if (role === "ceo") endpoint = "/api/v1/ceo/register";
      else if (role === "employee") endpoint = "/api/v1/employee/register";
      else if (role === "traffic")
        endpoint = "/api/v1/traffic-officer/register";

      const { first_name, last_name, email, password } = values;
      const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, {
        first_name,
        last_name,
        email,
        password,
      });
      console.log(response.data);
      toast.success(`${role.toUpperCase()} registered successfully`);
      console.log(response.data);
      setTimeout(() => navigate("/login"), 2000);
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
        <title>Signup</title>
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

      <div className="container mx-auto relative flex h-fit w-full items-center justify-center">
        <div className="relative grid h-fit w-[80%] overflow-hidden mt-10 mx-10 grid-cols-12 md:grid-cols-6 bg-black/10 shadow-md shadow-primary-400">
          <div className="col-span-12 md:col-span-6 my-4 px-2 h-[90%]">
            <div className="lg:px-11 md:px-5 px-4 sm:px-10 flex items-center justify-center flex-col h-full space-y-3">
              <div className="flex items-center justify-center flex-col gap-2">
                <img
                  src="/images/OzirixPng2.png"
                  alt="logo"
                  className="w-30 h-25"
                />
                <h1 className="text-white text-xl font-semibold text-center">
                  Create Account{" "}
                  <span>
                    <i className="fa-regular fa-circle-user"></i>
                  </span>
                </h1>
              </div>

              {/* اختيار نوع المستخدم */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="col-span-12 w-full rounded-lg bg-primary-600 text-white focus:outline-none"
              >
                <option value="ceo">CEO</option>
                <option value="employee">Employee</option>
                <option value="traffic">Traffic Officer</option>
              </select>

              <form
                onSubmit={formik.handleSubmit}
                className="space-y-3 w-full text-white grid grid-cols-12 gap-x-2"
              >
                {/* First Name */}
                <div className="bg-primary-600 px-3 py-3 rounded-lg col-span-12">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent placeholder:text-white focus:outline-0"
                  />
                </div>

                {formik.errors.first_name && formik.touched.first_name && (
                  <p className="text-gray-50 col-span-12 text-sm font-medium">
                    {" "}
                    *{formik.errors.first_name}{" "}
                  </p>
                )}

                {/* Last Name */}
                <div className="bg-primary-600 px-3 py-3 rounded-lg col-span-12">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent placeholder:text-white focus:outline-0"
                  />
                </div>

                {formik.errors.last_name && formik.touched.last_name && (
                  <p className="text-gray-50 col-span-12 text-sm font-medium">
                    {" "}
                    *{formik.errors.last_name}{" "}
                  </p>
                )}

                {/* Email */}
                <div className="bg-primary-600 px-3 py-3 rounded-lg col-span-12">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent placeholder:text-white focus:outline-0"
                  />
                </div>

                {formik.errors.email && formik.touched.email && (
                  <p className="text-gray-50 col-span-12 text-sm font-medium">
                    *{formik.errors.email || accountExistsError}
                  </p>
                )}
                {formik.touched.email && (
                  <p className="text-gray-50 col-span-12 text-sm font-medium">
                    {accountExistsError}
                  </p>
                )}

                {/* Password */}
                <div className="relative bg-primary-600 px-3 py-3 rounded-lg col-span-12">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent placeholder:text-white focus:outline-0"
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    } absolute top-[50%] right-[10px] -translate-y-[50%] cursor-pointer`}
                  ></i>
                </div>

                {formik.errors.password && formik.touched.password && (
                  <p className="text-gray-50 col-span-12 text-sm font-medium">
                    {" "}
                    *{formik.errors.password}{" "}
                  </p>
                )}

                <button
                  type="submit"
                  className="col-span-12 bg-primary-300 hover:bg-primary-600 transition duration-300 py-2 border border-primary-700 w-full rounded-lg"
                >
                  Signup as {role.toUpperCase()}
                </button>

                <p className="text-white text-sm col-span-12 text-center font-normal">
                  Already a member?{" "}
                  <span className="text-blue-500">
                    <Link to="/login">
                      Log In <i className="fa-solid fa-angle-right"></i>
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
