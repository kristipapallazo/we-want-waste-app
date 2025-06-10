// import React from "react";
// import {
//   Search,
//   ShoppingCart,
//   User,
//   Menu,
//   Heart,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { useTheme } from "../ctx/ThemeContext";

import { Layout } from "antd";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  //   const { isDark, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    console.log("Theme button clicked"); // Debug log
    // toggleTheme();
  };

  return (
    <Layout.Header className={styles.header}>
      <div className="">
        {/* Logo */}
        <div className={styles.log_cont}>
          <h2 className={styles.logo_text}>WeWantWaste</h2>
        </div>

        {/* Desktop Navigation */}
        {/* <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Deals
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
          </nav> */}

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleThemeToggle}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
            type="button"
          >
            {/* {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )} */}
          </button>
          <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {/* <Heart className="h-6 w-6" /> */}
          </button>
          <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {/* <User className="h-6 w-6" /> */}
          </button>
          <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative">
            {/* <ShoppingCart className="h-6 w-6" /> */}
            <span className="absolute -top-2 -right-2 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="md:hidden text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {/* <Menu className="h-6 w-6" /> */}
          </button>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
