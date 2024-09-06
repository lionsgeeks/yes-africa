import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineLanguage } from "react-icons/hi2";
import TransText from "../components/TransText";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [languageIsOpen, setLanguageIsOpen] = useState(false);
  const toggleLanguageIsOpen = () => {
    setLanguageIsOpen(!languageIsOpen);
  };
  const selectRef = useRef(null);
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setLanguageIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const { selectedLanguage, setSelectedLanguage } = useAppContext();

  const handleChangeLanguage = (e) => {
    let code = e.currentTarget.dataset.code;
    if (code) {
      // i18n.changeLanguage(code);
      setSelectedLanguage(code);
    }
  };

  const LANGUAGES = [
    // { label: "francais", code: "fr" },
    { label: "English", code: "en" },
    { label: "العربية", code: "ar" },
  ];
  return (
    <div>
      {/* <!-- component --> */}
      <nav className="bg-white border border-gray-200 px-2 sm:px-16 py-4 rounded shadow">
        <div
          className={`container flex flex-wrap ${
            selectedLanguage == "ar" && "flex-row-reverse"
          } justify-between items-center mx-auto`}
        >
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">Yes Africa</span>
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
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              {[
                [{ en: "Home", ar: "الرئيسية" }, "/"],
                [{ en: "About", ar: "حول" }, "/about"],
                [{ en: "Articles", ar: "المقالات" }, "/articles"],
                [{ en: "Contact", ar: "التواصل" }, "/contact"],
              ].map(([name, path], index) => (
                <Link
                  key={index}
                  to={path}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  <TransText {...name} />
                </Link>
              ))}

              <div
                ref={selectRef}
                className={`relative flex items-center`}
                onClick={toggleLanguageIsOpen}
              >
                <div
                  className={`cursor-pointer flex gap-1 ${
                    selectedLanguage == "ar" ? "flex-row-reverse" : ""
                  } items-center `}
                >
                  <HiOutlineLanguage className="h-[5vh]" />
                  <p className="">{selectedLanguage}</p>
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
