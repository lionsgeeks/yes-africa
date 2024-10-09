import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import TransText from "../components/TransText";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const Footer = () => {
  const { selectedLanguage } = useAppContext()
  return (
    <div>
      <div className="container mx-auto px-4 py-10 border-t-2 border-gray-100">
        <div className={`flex flex-wrap text-left lg:text-left  ${selectedLanguage == 'ar' ? "flex-row-reverse" : ""}`}>
          <div className={`w-full lg:w-6/12 px-4 ${selectedLanguage == 'ar' ? "flex flex-col items-end" : ""}`}>
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
              <TransText ar="دعنا نبقى على تواصل" en="Let's keep in touch!" />
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              <TransText
                ar="ابحث عنا على أي من هذه المنصات"
                en="Find us on any of these platforms"
              />
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              {/* icons */}
              <div className="flex flex-col justify-between gap-2 pt-4">
                <div className="flex gap-3">
                  <a target="blank" href="https://www.facebook.com/JadaraFoundation">
                    <FaFacebookF className="text-[1.4rem] fill-gray-400 hover:fill-blue-500 transition duration-200" />
                  </a>
                  <a
                    target="blank"
                    href="https://www.instagram.com/jadara_foundation/"
                  >
                    <FaInstagram className="text-[1.4rem] fill-gray-400 hover:fill-pink-600 transition duration-200" />
                  </a>
                  <a target="blank" href="https://x.com/JadaraFondation">
                    <BsTwitterX className="text-[1.4rem] fill-gray-400 hover:fill-black transition duration-200" />
                  </a>
                  <a
                    target="blank"
                    href="https://www.linkedin.com/company/jadara-foundation/"
                  >
                    <FaLinkedinIn className="text-[1.4rem] fill-gray-400 hover:fill-[#0a66c2] transition duration-200" />
                  </a>
                  <a
                    target="blank"
                    href="https://www.youtube.com/@FondationMarocainedelEtudiant"
                  >
                    <FaYoutube className="text-[1.4rem] fill-gray-400 hover:fill-[#ff0000] transition duration-200" />
                  </a>
                  <a target="blank" href="https://www.tiktok.com/@jadarafoundation">
                    <FaTiktok className="text-[1.4rem] fill-gray-400 hover:fill-black transition duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-full lg:w-6/12 px-4 ${selectedLanguage == 'ar' ? "text-right" : ""}`}>
            <div className="flex flex-wrap items-top mb-6 gap-5">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  <TransText ar="روابط مفيدة" en="Useful Links" />
                </span>
                <ul className="list-unstyled text-gray-700">
                  {[
                    [{ en: "Home", ar: "الرئيسية" }, "/"],
                    [{ en: "About", ar: "حول" }, "/about"],
                    [{ en: "Sommet", ar: "القمة" }, "/"],
                    [{ en: "Articles", ar: "المقالات" }, "/articles"],
                    // [{ en: "Contact", ar: "التواصل" }, "/contact"],
                  ].map(([name, path], index) => (
                    <Link
                      key={index}
                      to={path}
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                      <TransText {...name} />
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  <TransText ar="موارد أخرى" en="Other Resources" />
                </span>
                <ul className="list-unstyled text-gray-700">
                  {[
                    [
                      { en: "Terms & Conditions", ar: "الشروط والأحكام" },
                      "/",
                    ],
                    [{ en: "Privacy Policy", ar: "سياسة الخصوصية" }, "/about"],
                    [{ en: "Contact Us", ar: "تواصل معنا" }, "/contact"],
                  ].map(([name, path], index) => (
                    <Link
                      key={index}
                      to={path}
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                      <TransText {...name} />
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="my-6 border-blueGray-300"> */}
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            {/* <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2021</span><a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"> Notus JS by
          <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800">Creative Tim</a>.
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
