import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import DarkMode from "./DarkMode";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    navigate("/login");
  };
  const navLinkClass = ({ isActive }) =>
    `relative text-sm text-gray-700 font-medium tracking-wide transition-colors duration-300 hover:text-black 
    after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 hover:after:w-full 
    after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
    ${isActive ? "text-black after:w-full" : ""}`;

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-8 border-b border-gray-100">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={assets.logo} alt="Logo" className="w-28 sm:w-36 rounded" />
        </Link>

        {/* Main Navigation - Desktop */}
        <ul className="hidden sm:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/collection" className={navLinkClass}>
            COLLECTION
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            ABOUT
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            CONTACT
          </NavLink>
        </ul>

        {/* Action Icons and User Menu */}
        <div className="flex items-center gap-5 sm:gap-6">
          {/* Search Icon */}
          <button onClick={() => setShowSearch(true)} className="p-1">
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
            />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="p-1"
            >
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>

            {showProfileDropdown && (
              <div className="absolute top-full right-0 mt-4 w-40 bg-white rounded-lg shadow-lg border border-gray-100 animate-fadeIn">
                <div className="flex flex-col py-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left w-full px-4 py-2 text-red-500 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-1">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 min-w-5 opacity-75 hover:opacity-100 transition-opacity"
            />
            <div className="absolute right-[-8px] top-[-8px] min-w-[20px] text-center leading-5 bg-blue-600 text-white text-xs rounded-full font-bold px-1">
              {getCartCount()}
            </div>
          </Link>

          {/* Mobile Menu Icon */}
          <button onClick={() => setVisible(true)} className="p-1 sm:hidden">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="w-5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
            />
          </button>
          <div>
            <DarkMode />
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out bg-white shadow-xl ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 text-gray-700 w-64">
            <button
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 py-3 border-b border-gray-200"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-90"
                alt="Close menu"
              />
              <span className="font-semibold text-lg">Close</span>
            </button>
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className="py-4 border-b border-gray-100 text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className="py-4 border-b border-gray-100 text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className="py-4 border-b border-gray-100 text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className="py-4 border-b border-gray-100 text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
