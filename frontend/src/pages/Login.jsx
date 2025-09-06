import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Debug: Log the data being sent
    console.log("Submitting:", { currentState, email, password, name });
    console.log("Backend URL:", backendUrl);

    try {
      if (currentState === "Sign Up") {
        if (!name || !email || !password) {
          toast.error("Please fill in all fields");
          return;
        }

        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.token) {
          toast.success("Sign Up successful!");
          setToken(response.data.token);
          navigate("/");
        } else {
          toast.error("Sign Up failed. Please try again.");
        }
      } else if (currentState === "Login") {
        if (!email || !password) {
          toast.error("Please fill in all fields");
          return;
        }

        console.log("Login request data:", { email, password });

        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        console.log("Login response:", response.data);

        if (response.data.token) {
          toast.success("Login successful!");
          setToken(response.data.token);
          navigate("/");
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen border-t">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full sm:max-w-md mx-auto transform transition-transform duration-500 hover:scale-105"
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-gray-800 tracking-wide">
            {currentState === "Login"
              ? "Login"
              : currentState === "Sign Up"
              ? "Sign Up"
              : "Forgot Password"}
          </p>
          <hr className="mt-2 border-t-2 border-blue-500 w-16 mx-auto" />
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
          />

          {(currentState === "Login" || currentState === "Sign Up") && (
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6">
          {currentState === "Forgot Password" && (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Send Reset Link
            </button>
          )}

          {(currentState === "Login" || currentState === "Sign Up") && (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {currentState === "Login" ? "Login" : "Sign Up"}
            </button>
          )}
        </div>

        {/* Links and State Toggles */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-4">
          {currentState === "Login" && (
            <>
              <p
                onClick={() => setCurrentState("Forgot Password")}
                className="text-blue-600 cursor-pointer hover:underline mb-2 sm:mb-0"
              >
                Forgot Password?
              </p>
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Create Account
              </p>
            </>
          )}

          {currentState === "Sign Up" && (
            <p
              onClick={() => setCurrentState("Login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </p>
          )}

          {currentState === "Forgot Password" && (
            <p
              onClick={() => setCurrentState("Login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Back to Login
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
