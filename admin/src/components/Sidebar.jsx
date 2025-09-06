import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 pt-6 pl-[10%] text-[15px]">
        <NavLink
          to="/add"
          className="flex items-center gap-3 justify-between p-4 bg-gray-300 text-white border-r -0 px-3 py-4 rounded-l "
        >
          <img
            src={assets.add_icon}
            alt="Add Icon"
            className="inline-block mr-2"
          />
          <p className="hidden md:block text-black">Add Items</p>
        </NavLink>
        <NavLink
          to="/order"
          className="flex items-center gap-3 justify-between p-4 bg-gray-300 text-white border-r -0 px-3 py-4 rounded-l"
        >
          <img
            src={assets.order_icon}
            alt="Order Icon"
            className="inline-block mr-2"
          />
          <p className="hidden md:block text-black">Order</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center gap-3 justify-between p-4 bg-gray-300 text-white border-r -0 px-3 py-4 rounded-l"
        >
          <img
            src={assets.order_icon}
            alt="Add Icon"
            className="inline-block mr-2"
          />
          <p className="hidden md:block text-black">List Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
