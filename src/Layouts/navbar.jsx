import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLanguage } from "react-icons/hi2";
import TransText from "../components/TransText";
import { useAppContext } from "../context/AppContext";

import jadara from "../assets/images/sponsors/Jadaralogo.png";
import pan from "../assets/images/sponsors/pan.jpeg";
import yeslogo from "../assets/images/yeslogo.png";

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
    { label: "Français", code: "fr" },
    { label: "English", code: "en" },
    { label: "العربية", code: "ar" },
  ];
  const logos = [
    {
      image: yeslogo,
      link: "/",
    },
    {
      image: jadara,
      link: "https://jadara.ngo/",
    },
    {
      image: pan,
      link: "https://panafricanyouthunion.org/fr/",
    },
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
          <div className="flex items-center gap-10">
            <div className="flex gap-2 items-center">
              {/* <span className="self-center text-xl font-semibold whitespace-nowrap">Yes Africa</span> */}
              {logos.map((element, index) => (
                <a key={index} href={element.link} className="flex items-center">
                  <img className={`${index === 0 ? 'lg:w-[5.5vw] md:w-[11vw] w-[20vw]' : 'lg:w-[3vw] md:w-[7vw] w-[12vw]'} `} src={element.image} alt="" />
                </a>
              ))}
            </div>
          </div>
 
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
                              : location.pathname === "/participants"
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
                              : location.pathname === "/participants"
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
                        <ul className="absolute left-0 w-40 mt-2 z-10 bg-white border border-gray-200 shadow-lg rounded">
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
                          <li>
                            <Link
                              to="/participants"
                              className={`block px-4 py-2 hover:bg-gray-100 ${
                                location.pathname === "/participants"
                                  ? "text-beta"
                                  : "text-alpha"
                              }`}
                            >
                              Participants
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
