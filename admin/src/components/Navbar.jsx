import React from "react";
import { assets } from "../assets/assets";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-200 text-white">
      {/* Navbar for admin panel */}

      <img src={assets.logo} alt="Logo" className="w-[max(12%,80px)] rounded" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-800 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
