import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLanguage } from "react-icons/hi2";
import TransText from "../components/TransText";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [languageIsOpen, setLanguageIsOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };
  const toggleLanguageIsOpen = () => {
    setLanguageIsOpen(!languageIsOpen);
  };
  const selectRef = useRef(null);
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setLanguageIsOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const location = useLocation();

  const { selectedLanguage, setSelectedLanguage } = useAppContext();

  const handleChangeLanguage = (e) => {
    let code = e.currentTarget.dataset.code;
    if (code) {
      setSelectedLanguage(code);
    }
  };
  const navItems = [
    { label: { en: "Home", ar: "الرئيسية", fr: "Accueil" }, path: "/" },
    { label: { en: "About", ar: "حول", fr: "À propos" }, path: "/about" },
    {
      label: { en: "Participate", ar: "المشاركة", fr: "Participer" },
      path: "/participate",
      isDropdown: true,
    }, // Mark "Participate" as a dropdown
    {
      label: { en: "Articles", ar: " المقالات", fr: "Articles" },
      path: "/articles",
    },
    {
      label: { en: "Contact", ar: "اتصل بنا", fr: "Contact" },
      path: "/contact",
    },
  ];
  const LANGUAGES = [
    { label: "francais", code: "fr" },
    { label: "English", code: "en" },
    { label: "العربية", code: "ar" },
  ];
  return (
    <div className="sticky top-0 z-30">
      {/* <!-- component --> */}
      <nav className="bg-white border border-gray-200 px-3 sm:px-16 py-4 rounded shadow">
        <div
          className={`container flex flex-wrap ${
            selectedLanguage == "ar" && "flex-row-reverse"
          } justify-between items-center mx-auto`}
        >
          <a href="/" className="flex items-center">
            {/* <span className="self-center text-xl font-semibold whitespace-nowrap">Yes Africa</span> */}
            <svg
              id="Layer_2"
              data-name="Layer 2"
              // className="bg-red-500"
              className="w-32 md:w-40 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 797.35 234.47"
            >
              <g>
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M321.04,54.5v18.17h-9.43v-18.17l-18.09-30.37h10.33l12.48,21.98,12.55-21.98h10.26l-18.09,30.37Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M371.72,55.12c0,10.26-7.97,18.44-18.58,18.44s-18.51-8.18-18.51-18.44,7.97-18.44,18.51-18.44,18.58,8.11,18.58,18.44ZM362.7,55.12c0-5.48-3.68-9.98-9.57-9.98s-9.5,4.51-9.5,9.98,3.68,9.98,9.5,9.98,9.57-4.51,9.57-9.98Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M409.84,37.51v35.15h-8.81v-4.3c-1.94,2.91-5.06,5.2-10.19,5.2-8.87,0-12.9-7.21-12.9-14.63v-21.42h8.81v19.55c0,4.51,1.87,7.9,6.8,7.9,5.27,0,7.49-3.81,7.49-7.9v-19.55h8.81Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M429.19,45.56v12.83c0,4.02.55,6.38,5.41,6.38.62,0,1.46-.07,2.08-.14v8.04c-.9.28-1.87.48-3.68.48-9.01,0-12.62-6.03-12.62-13.31v-14.28h-4.99v-8.04h4.99v-7.35h8.81v7.35h7.49v8.04h-7.49Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M475.85,51.31v21.35h-8.81v-19.55c0-4.51-1.87-7.9-6.86-7.9s-7.49,3.88-7.49,7.9v19.55h-8.74V24.13h8.74v17.68c1.94-2.84,5.13-5.13,10.26-5.13,8.87,0,12.89,7.21,12.89,14.63Z"
                />
              </g>
              <g>
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M330.64,132.9v8.74h-28.64v-48.53h28.01v8.74h-18.65v10.95h17.06v8.74h-17.06v11.37h19.28Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M388.6,119.65v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M434.07,124.09c0,9.22-6.24,18.44-17.19,18.44-5.41,0-8.94-2.15-11.16-4.99v17.47h-8.81v-48.53h8.81v4.16c2.22-2.91,5.76-4.99,11.16-4.99,10.95,0,17.19,9.22,17.19,18.44ZM425.06,124.09c0-5.41-3.47-9.98-9.5-9.98s-9.5,4.58-9.5,9.98,3.4,9.98,9.5,9.98,9.5-4.58,9.5-9.98Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M475.32,124.09c0,10.26-7.97,18.44-18.58,18.44s-18.51-8.18-18.51-18.44,7.97-18.44,18.51-18.44,18.58,8.11,18.58,18.44ZM466.31,124.09c0-5.48-3.68-9.98-9.57-9.98s-9.5,4.51-9.5,9.98,3.68,9.98,9.5,9.98,9.57-4.51,9.57-9.98Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M530.37,106.48l-11.79,35.15h-7.83l-7.07-20.73-7,20.73h-7.83l-11.79-35.15h9.5l6.73,22.32,7.56-22.32h5.76l7.49,22.32,6.79-22.32h9.5Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M567.53,127.49h-26.07c1.25,4.72,5.13,7.21,9.98,7.21,4.02,0,6.79-2.15,7.83-3.47l7.07,4.16c-2.84,3.95-8.25,7.14-14.91,7.14-11.65,0-19.34-7.76-19.34-18.44s8.25-18.44,17.96-18.44c10.61,0,19.07,7.97,17.47,21.84ZM558.93,120.69c-.9-4.58-4.02-7.21-8.74-7.21-4.3,0-7.7,2.7-8.74,7.21h17.47Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M594.49,105.65v9.57c-10.4-1.25-11.72,5.41-11.72,11.92v14.49h-8.81v-35.15h8.81v5.75c2.63-4.37,7.49-6.59,11.72-6.59Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M633.39,127.49h-26.07c1.25,4.72,5.13,7.21,9.98,7.21,4.02,0,6.79-2.15,7.83-3.47l7.07,4.16c-2.84,3.95-8.25,7.14-14.91,7.14-11.65,0-19.34-7.76-19.34-18.44s8.25-18.44,17.96-18.44c10.61,0,19.07,7.97,17.47,21.84ZM624.79,120.69c-.9-4.58-4.02-7.21-8.74-7.21-4.3,0-7.7,2.7-8.74,7.21h17.47Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M690.51,119.65v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M732.18,127.49h-26.07c1.25,4.72,5.13,7.21,9.98,7.21,4.02,0,6.79-2.15,7.83-3.47l7.07,4.16c-2.84,3.95-8.25,7.14-14.91,7.14-11.65,0-19.34-7.76-19.34-18.44s8.25-18.44,17.96-18.44c10.61,0,19.07,7.97,17.47,21.84ZM723.58,120.69c-.9-4.58-4.02-7.21-8.74-7.21-4.3,0-7.7,2.7-8.74,7.21h17.47Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M770.52,120.28v21.35h-8.81v-19.55c0-4.51-1.87-7.9-6.86-7.9s-7.49,3.88-7.49,7.9v19.55h-8.74v-35.15h8.74v4.3c1.94-2.84,5.13-5.13,10.26-5.13,8.87,0,12.89,7.21,12.89,14.63Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M789.86,114.52v12.83c0,4.02.55,6.38,5.41,6.38.62,0,1.46-.07,2.08-.14v8.04c-.9.28-1.87.48-3.68.48-9.01,0-12.62-6.03-12.62-13.31v-14.28h-4.99v-8.04h4.99v-7.35h8.81v7.35h7.49v8.04h-7.49Z"
                />
              </g>
              <g>
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M336.25,197.63c0,7.56-5.41,14.98-18.1,14.98-9.08,0-17.2-3.74-19.55-11.79l9.08-2.84c.69,2.77,3.61,6.38,10.4,6.38,4.85,0,8.74-1.87,8.74-6.03,0-4.85-5.48-5.2-13.17-7.07-9.78-2.43-13.03-7.35-13.03-14.07,0-9.15,7-14.84,17.12-14.84,8.11,0,14.49,4.02,16.57,11.44l-9.15,2.22c-.55-2.57-3.05-5.41-7.9-5.41-4.02,0-7.35,2.08-7.35,5.96,0,5.48,6.17,6.24,10.68,7.28,11.51,2.63,15.67,5.96,15.67,13.8Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M374.03,176.56v35.15h-8.81v-4.3c-1.94,2.91-5.06,5.2-10.19,5.2-8.87,0-12.9-7.21-12.9-14.63v-21.42h8.81v19.55c0,4.51,1.87,7.9,6.8,7.9,5.27,0,7.49-3.81,7.49-7.9v-19.55h8.81Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M433.03,189.73v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M492.03,189.73v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M500.07,166.71c0-2.57,2.08-4.65,4.64-4.65s4.72,2.08,4.72,4.65-2.08,4.71-4.72,4.71-4.64-2.08-4.64-4.71ZM500.34,176.56h8.81v35.15h-8.81v-35.15Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M528.49,184.6v12.83c0,4.02.55,6.38,5.41,6.38.62,0,1.46-.07,2.08-.14v8.04c-.9.28-1.87.48-3.68.48-9.01,0-12.62-6.03-12.62-13.31v-14.28h-4.99v-8.04h4.99v-7.35h8.81v7.35h7.49v8.04h-7.49Z"
                />
              </g>
              <g>
                <path
                  className="fill-[#b09417] stroke-0"
                  d="M17.71,28.34L43.74,3.51c.61-.58,1.41-.93,2.25-.98L90.03,0c.93-.05,1.84.26,2.54.87l19.67,17.09c1.67,1.45,4.25,1.04,5.38-.85l.98-1.63c.69-1.15,1.96-1.81,3.29-1.72l29.77,2.02c1.08.07,2.08.64,2.69,1.53l43.13,62.79c.61.89,1.59,1.45,2.67,1.53l10.2.76c2.62.2,4.14,3.07,2.81,5.35l-31.46,53.71c-.42.71-.57,1.55-.44,2.36l3.73,23.1c.21,1.33-.34,2.66-1.43,3.45l-17.74,12.81c-.66.48-1.14,1.17-1.35,1.95l-4.77,17.58c-.21.76-.66,1.43-1.29,1.91l-38.67,29.13c-1.68,1.27-4.09.8-5.18-1l-14.66-24.19c-.27-.45-.44-.96-.5-1.48l-6.66-65.5c-.07-.67-.32-1.3-.74-1.83l-12.64-16.18c-.63-.81-.88-1.85-.69-2.86l1.14-5.97c.43-2.26-1.36-4.32-3.66-4.22l-43.52,2c-1.03.05-2.02-.35-2.73-1.1L.99,81.21c-.69-.72-1.05-1.7-.98-2.7l2.1-31.19c.05-.78.36-1.51.87-2.1l14.51-16.66c.07-.08.15-.16.23-.24Z"
                />
                <path
                  className="fill-[#b09417] stroke-0"
                  d="M199.52,178.4l-13.14,7.71c-.72.42-1.27,1.09-1.55,1.88l-2.17,6.11c-.28.79-.27,1.66.03,2.45l.92,2.44c.44,1.15.24,2.45-.51,3.43l-2.98,3.86c-.6.78-.85,1.77-.7,2.74l1.4,8.64c.26,1.63,1.61,2.86,3.25,2.98l7.71.56c1.5.11,2.91-.73,3.51-2.11l12.86-29.09c.33-.74.39-1.56.19-2.34l-2.33-8.88c-.69-2.63-3.96-3.55-5.92-1.65h0"
                />
              </g>
              <g>
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M207.88,128.76c3.87-25.54-11.91-48.98-36.43-51.74l.35,9.5c-20.2-.94-33.2,14.23-43.41,32.69,4.49,12.29,7.78,24.99,9.82,37.86,17.17,15.11,52.21,14.19,66.27-5.97l-12.8-8.19c-4.85,6.41-14.25,9.82-22.68,9.73-16.89,0-27.47-9.73-29.86-23.88h68.75ZM139.13,115.44c4.45-31.37,49.42-33.01,53.06,0h-53.06Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M250.38,115.1c-9.89-2.05-21.83-2.74-21.83-12.45,0-7.16,6.31-11.94,14.84-11.94,9.73,0,14.84,5.11,16.37,9.89l14.5-3.93c-3.06-12.79-15.52-19.96-29.51-19.96-18.77,0-31.91,11.25-31.91,27.12.18,34.64,49.06,18.16,49.65,37.02,0,7.68-6.31,12.28-17.57,12.28-13.99,0-18.61-6.14-19.97-10.57l-15.18,5.11c3.41,12.97,17.74,19.78,34.8,19.78,23.03,0,33.95-12.79,33.95-28.15,0-12.96-6.99-19.78-28.15-24.22Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M166.76,81.82c-20.16,1.21-33.63,18.23-43.71,37.01,5.47,14.45,9.26,29.61,11.21,44.97l-15.09,1.91c-1.15-9.08-2.99-18.03-5.49-26.8-8.31,21.1-12.65,43.67-12.71,66.45-2.88,0-12.17-.04-15.2-.05.08-30.22,7.14-60.25,20.57-87.33-11.56-26.29-35.91-69.08-67.74-66.73l-1.33-15.16c36.87-2.88,62.85,34.89,78.27,65.42,11.64-19.04,29.49-34.1,50.67-34.89.16,4.51.38,10.68.55,15.19Z"
                />
                <path
                  className="fill-[#2e539d] stroke-0"
                  d="M132.86,58.95c1.48,9.53-6.62,17.64-16.16,16.16-18.24-3.69-14.12-29.95,4.45-27.81,5.93.89,10.78,5.72,11.71,11.65Z"
                />
              </g>
            </svg>
          </a>

          <div className="flex items-center">
            <button
              onClick={() => setIsToggle(!isToggle)}
              id="menu-toggle"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!-- Hamburger icon --> */}
              <svg
                className="h-6 w-6 text-alpha"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`w-full md:block md:w-auto ${isToggle ? "" : "hidden"} `}
            id="mobile-menu"
          >
            <ul
              className={`flex flex-col items-center mt-4 ${
                selectedLanguage == "ar" ? "md:flex-row-reverse" : "md:flex-row"
              } md:gap-x-8 md:mt-0 md:text-sm md:font-medium`}
            >
              {navItems.map((item, index) => {
                if (item.isDropdown) {
                  return (
                    <li key={index} className={`relative`} ref={dropdownRef}>
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                      >
                        <span
                          className={`${
                            location.pathname === "/form"
                              ? "text-beta"
                              : "text-alpha"
                          }`}
                        >
                          {item.label[selectedLanguage]
                            ? item.label[selectedLanguage]
                            : item.label["en"]}
                        </span>
                        <svg
                          className={`w-5 h-5 transition-transform transform ${
                            dropdownIsOpen ? "rotate-180" : ""
                          } ${
                            location.pathname === "/form"
                              ? "text-beta"
                              : "text-alpha"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {dropdownIsOpen && (
                        <ul className="absolute left-0 w-40 mt-2 bg-white border border-gray-200 shadow-lg rounded">
                          <li>
                            <Link
                              to="/form"
                              className={`block px-4 py-2 hover:bg-gray-100 ${
                                location.pathname === "/form"
                                  ? "text-beta"
                                  : "text-alpha"
                              }`}
                            >
                              NGO's
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              to="/organizations"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Organizations
                            </Link>
                          </li> */}
                        </ul>
                      )}
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className={`${
                          location.pathname === item.path
                            ? "text-beta"
                            : "text-alpha"
                        } hover:text-beta`}
                      >
                        {item.label[selectedLanguage]
                          ? item.label[selectedLanguage]
                          : item.label["en"]}
                      </Link>
                    </li>
                  );
                }
              })}

              <div
                ref={selectRef}
                className={`relative flex items-center`}
                onClick={toggleLanguageIsOpen}
              >
                <div
                  className={`cursor-pointer flex gap-1  ${
                    selectedLanguage == "ar" ? "flex-row-reverse" : ""
                  } items-center ${
                    languageIsOpen ? "text-beta" : "text-alpha"
                  }`}
                >
                  <HiOutlineLanguage className="h-[5vh]" />
                  <p className="">
                    {selectedLanguage !== "sw" ? selectedLanguage : "en"}
                  </p>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className={`inline w-4 h-4  ${
                      selectedLanguage == "ar" ? "mr-1" : "ml-1"
                    } transition-transform duration-75 transform ${
                      languageIsOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {languageIsOpen && (
                  <div className={`absolute top-10 z-30 mt-2 `}>
                    <div className=" rounded-md  flex flex-col items-start gap-2 shadow-lg bg-white  py-2">
                      {LANGUAGES.map(({ code, label, flag }) => {
                        return (
                          <div
                            onClick={handleChangeLanguage}
                            data-code={code}
                            className="flex justify-start gap-2 px-3 py-1 hover:bg-gray-100 w-full transition duration-200"
                          >
                            {flag}
                            <p className="cursor-pointer">{label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
