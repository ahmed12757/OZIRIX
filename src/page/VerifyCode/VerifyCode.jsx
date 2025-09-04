import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function VerifyCode() {
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: function (values) {
      senddata(values);
      console.log(values);
    },
  });
  async function senddata(values) {
    const lodingToastId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "Success") {
        toast.success(data.status);
        setTimeout(() => {
          navigate("/resetPassword");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <div className=" relative h-screen my-auto pt-20  block  ">
      <Helmet>
        <title> verify Code </title>
      </Helmet>
      <video
        className=" absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
      >
        <source
          src="https://drive.google.com/uc?export=download&id=11sKTrjw9p4TBywkQAQ7tXdebFR9xoHRG"
          type="video/mp4"
        />
      </video>
      <div className=" absolute top-0 left-0 w-full h-full bg-black/60 -z-5 "></div>
      <div className="  container  mx-auto relative flex h-screen items-center justify-center   ">
        <div className=" relative grid h-fit overflow-hidden  mx-10  grid-cols-12 md:grid-cols-6 bg-black/10 shadow-md shadow-primary-400">
          <div className="col-span-12 md:col-span-6 my-4 px-2 h-[90%]">
            <div className="lg:px-12 md:px-8 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
              <div className="flex items-center  justify-center flex-col gap-2">
                <h1 className="text-gray-400 text-xl font-semibold text-center">
                  Check your email
                </h1>
                <p className="text-center text-gray-400">
                  Reset code sent to your email
                </p>
              </div>
              <form
                action=""
                className=" space-y-3 w-full text-gray-200 "
                onSubmit={formik.handleSubmit}
              >
                <div className="resetCode bg-primary-600 px-4 py-3 rounded-lg ">
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Code"
                    className="w-full focus:outline-0 !bg-transparent focus:!bg-transparent focus:border-0 placeholder:text-gray-400"
                    name="resetCode"
                    onBlur={formik.handleBlur}
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                  />
                </div>

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
