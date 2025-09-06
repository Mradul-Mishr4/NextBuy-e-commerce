// src/components/ThemeToggleButton.jsx

import React, { useContext } from "react";

import { ShopContext } from "../context/ShopContext";

const DarkMode = () => {
  const { theme, toggleTheme } = useContext(ShopContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-1 text-2xl"
      aria-label="Toggle dark mode"
    >
      <span role="img" aria-label="sun/moon icon">
        {theme === "light" ? "☀️" : "🌙"}
      </span>
    </button>
  );
};

export default DarkMode;
