import React from "react";
import { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const Login = ({ setToken }) => {
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin/login", {
        email,
        password,
      });
      if (response.data.token) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }

      // Here you would typically handle the login logic, such as sending a request to your backend.
      // For this example, we'll just log a message.
      console.log("Login form submitted");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message);
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80";
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="bg-gray-200 bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Admin Login
        </h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-1">Email Address</p>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-500 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
            />
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-1">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-500 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
