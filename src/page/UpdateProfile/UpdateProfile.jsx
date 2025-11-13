import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const BASE_URL = "http://127.0.0.1:8000";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") || "employee"; // employee | ceo | traffic-officer

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    bio: "",
    location: "",
    gender: "",
    date_of_birth: "",
  });

  const [loading, setLoading] = useState(false);

  const endpoints = {
    employee: {
      get: "/api/v1/employee/info",
      update: "/api/v1/employee/update",
    },
    ceo: {
      get: "/api/v1/ceo/info",
      update: "/api/v1/ceo/update",
    },
    traffic: {
      get: "/api/v1/traffic-officer/info",
      update: "/api/v1/traffic-officer/update",
    },
  };

  // 🟢 Fetch user profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${endpoints[role].get}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.user || res.data;

        setInitialValues({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          phone_number: userData.phone_number || "",
          bio: userData.bio || "",
          location: userData.location || "",
          gender: userData.gender || "",
          date_of_birth: userData.date_of_birth
            ? userData.date_of_birth.split("T")[0]
            : "",
        });
      } catch (err) {
        toast.error("Failed to load profile data ❌");
      }
    };

    fetchData();
  }, [role, token]);

  // 🔎 Validate fields
  const validate = (values) => {
    const errors = {};
    const egyptPhoneRegex = /^(?:\+20|0)?1[0-9]{9}$/;

    if (!values.first_name) errors.first_name = "First name is required";
    if (!values.last_name) errors.last_name = "Last name is required";

    if (values.phone_number && !egyptPhoneRegex.test(values.phone_number)) {
      errors.phone_number = "Invalid Egyptian phone number";
    }

    if (!values.location) errors.location = "Location is required";
    if (!values.gender) errors.gender = "Gender is required";
    if (!values.date_of_birth)
      errors.date_of_birth = "Date of birth is required";

    return errors;
  };

  // 🟡 Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await axios.put(
        `${BASE_URL}${endpoints[role].update}`,
        {
          user: {
            first_name: values.first_name,
            last_name: values.last_name,
          },
          phone_number: values.phone_number,
          bio: values.bio,
          location: values.location,
          gender: values.gender,
          date_of_birth: values.date_of_birth,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated successfully 🎉");
      setTimeout(() => navigate("/profile"), 1200);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      toast.error(error.response.data.message.phone_number);
      setAccountExistsError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className=" min-h-screen bg-black text-black flex flex-col items-center pt-24 pb-4 ">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className="w-fit mx-auto p-6 bg-white/80 rounded-lg shadow-lg ">
        <Toaster position="top-right" reverseOrder={false} />
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Profile ({role})
        </h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="space-y-5">
              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block mb-1">First Name</label>
                  <Field
                    name="first_name"
                    className={`w-full rounded-lg border px-3 py-2 bg-transparent ${
                      touched.first_name && errors.first_name
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1">Last Name</label>
                  <Field
                    name="last_name"
                    className={`w-full rounded-lg border px-3 py-2 bg-transparent ${
                      touched.last_name && errors.last_name
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1">Phone Number</label>
                <Field
                  name="phone_number"
                  placeholder="Ex:01xxxxxxxx"
                  className={`w-full rounded-lg border px-3 py-2 bg-transparent ${
                    touched.phone_number && errors.phone_number
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block mb-1">Bio</label>
                <Field
                  as="textarea"
                  name="bio"
                  rows="3"
                  className="w-full rounded-lg border border-gray-400 px-3 py-2 bg-transparent"
                />
              </div>

              {/* Location + Gender */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block mb-1">Location</label>
                  <Field
                    name="location"
                    className={`w-full rounded-lg border px-3 py-2 bg-transparent ${
                      touched.location && errors.location
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1">Gender</label>
                  <Field
                    as="select"
                    name="gender"
                    className={`w-full rounded-lg border px-3 py-2 bg-transparent ${
                      touched.gender && errors.gender
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block mb-1">Date of Birth</label>
                <Field
                  type="date"
                  name="date_of_birth"
                  className={`w-full rounded-lg border px-3 py-2 bg-transparent ${
                    touched.date_of_birth && errors.date_of_birth
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                <ErrorMessage
                  name="date_of_birth"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
