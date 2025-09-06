import React from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/frontend_assets/assets";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    React.useContext(ShopContext);
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/collection") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location.pathname]);
  return showSearch && visible ? (
    <div className=" border-t border-b bg-gray-50 text-center">
      <div className=" inline-flex items-center jsutify-center border border-gray-400 px-3 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm "
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer"
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
