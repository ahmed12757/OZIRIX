import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { Helmet } from "react-helmet";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = localStorage.getItem("role");
  const navigate = useNavigate(); // For navigation to edit page

  useEffect(() => {
    const fetchProfile = async () => {
      if (!role) {
        setError("Role not found. Please log in again.");
        setLoading(false);
        return;
      }

      let endpoint = "";
      switch (role) {
        case "employee":
          endpoint = "/api/v1/employee/info";
          break;
        case "ceo":
          endpoint = "/api/v1/ceo/info";
          break;
        case "traffic":
          endpoint = "/api/v1/traffic-officer/info";
          break;
        default:
          setError("Unknown role. Please contact support.");
          setLoading(false);
          return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.status === "success") {
          setProfile(response.data.profile);
        } else {
          setError("Failed to load profile data.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError("An error occurred while loading your profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role]);

  if (loading)
    return (
      <p className="text-center h-screen bg-black ">Loading profile data...</p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profile)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load data</p>
    );

  const {
    user = {},
    profile_pic,
    date_of_birth,
    gender,
    phone_number,
    bio,
    location,
  } = profile;

  const handleEditProfile = () => {
    navigate("/updateProfile"); // Adjust the route to your edit profile page
  };

  return (
    <div className="flex flex-col items-center pt-24 pb-4 justify-center min-h-screen bg-black text-gray-900">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white/80 shadow-xl rounded-lg  p-4 w-full max-w-lg border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile_pic || "/media/profile_pics/default_profile.jpg"}
            alt={`${user.first_name || "User"} ${
              user.last_name || ""
            }'s profile picture`}
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-md"
          />
          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-600 text-lg">{user.email}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Date of Birth:</strong>
            <span className="text-gray-900">
              {date_of_birth || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Gender:</strong>
            <span className="text-gray-900">{gender || "Not specified"}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Phone Number:</strong>
            <span className="text-gray-900">
              {phone_number || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Location:</strong>
            <span className="text-gray-900">{location || "Not specified"}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-700 mb-1">Bio:</strong>
            <span className="text-gray-900 bg-gray-50/50 p-3 rounded-md border">
              {bio || "No bio available"}
            </span>
          </div>
        </div>

        <button
          onClick={handleEditProfile}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
