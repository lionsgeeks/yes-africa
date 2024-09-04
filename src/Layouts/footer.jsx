import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <div class="container mx-auto px-4 py-10 border-t-2 border-gray-100">
        <div class="flex flex-wrap text-left lg:text-left">
          <div class="w-full lg:w-6/12 px-4">
            <h4 class="text-3xl fonat-semibold text-blueGray-700">
              Let's keep in touch!
            </h4>
            <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms
            </h5>
            <div class="mt-6 lg:mb-0 mb-6">
              {/* icons */}
              <div className="flex flex-col justify-between gap-2 pt-4">
                <div className="flex gap-3">
                  <a target="blank" href="https://www.facebook.com/LionsGeek">
                    <FaFacebookF className="text-[1.4rem] fill-gray-400 hover:fill-blue-500 transition duration-200" />
                  </a>
                  <a
                    target="blank"
                    href="https://www.instagram.com/lions_geek/"
                  >
                    <FaInstagram className="text-[1.4rem] fill-gray-400 hover:fill-pink-600 transition duration-200" />
                  </a>
                  <a target="blank" href="https://x.com/LionsGeek">
                    <BsTwitterX className="text-[1.4rem] fill-gray-400 hover:fill-black transition duration-200" />
                  </a>
                  <a
                    target="blank"
                    href="https://www.linkedin.com/company/lionsgeek/"
                  >
                    <FaLinkedinIn className="text-[1.4rem] fill-gray-400 hover:fill-[#0a66c2] transition duration-200" />
                  </a>
                  <a
                    target="blank"
                    href="https://www.youtube.com/channel/UCmd_wMUuFYbZ_jJgFxErDyA"
                  >
                    <FaYoutube className="text-[1.4rem] fill-gray-400 hover:fill-[#ff0000] transition duration-200" />
                  </a>
                  <a target="blank" href="https://www.tiktok.com/@lions_geek">
                    <FaTiktok className="text-[1.4rem] fill-gray-400 hover:fill-black transition duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="flex flex-wrap items-top mb-6">
              <div class="w-full lg:w-4/12 px-4 ml-auto">
                <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://blog.creative-tim.com?ref=njs-profile"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://www.github.com/creativetimofficial?ref=njs-profile"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/terms?ref=njs-profile"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/privacy?ref=njs-profile"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/contact-us?ref=njs-profile"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <hr class="my-6 border-blueGray-300"> */}
        <div class="flex flex-wrap items-center md:justify-between justify-center">
          <div class="w-full md:w-4/12 px-4 mx-auto text-center">
            {/* <div class="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2021</span><a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank"> Notus JS by
          <a href="https://www.creative-tim.com?ref=njs-profile" class="text-blueGray-500 hover:text-blueGray-800">Creative Tim</a>.
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
