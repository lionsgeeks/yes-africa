import { Link } from "react-router-dom";
import { TransText } from "../../../components";
import { useAppContext } from "../../../context/AppContext";

import partner1 from "../../../assets/images/partners-sponsors/AG-Partners.png"
import partner2 from "../../../assets/images/partners-sponsors/Amazon-Web-Services.png"
import partner3 from "../../../assets/images/partners-sponsors/Brand-AFRICA.png"       
import partner4 from "../../../assets/images/partners-sponsors/Glovo-logo-Green.png"
import partner5 from "../../../assets/images/partners-sponsors/Meta_Lockup_PositivePrimary_RGB.png"
import partner6 from "../../../assets/images/partners-sponsors/Sages-Noir.png"
import partner7 from "../../../assets/images/partners-sponsors/UM6P-Primary-Lockup-Web.png"

export const SponsorsSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <section
        className={`px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${
          selectedLanguage == "ar" && "text-end"
        }`}
      >
        <h2 className="text-xl text-alpha font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
          <TransText en="Partners & Sponsors" ar="الشركاء والممولون" />
        </h2>
        <div
          className={`flex flex-wrap px-4 gap-x-6 gap-y-8 md:px-6 md:gap-x-10 lg:gap-x-16 lg:px-12 ${
            selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {[
            [partner1, "https://publicisgroupeafrica.com/"],
            [partner2, "https://aws.amazon.com/"],
            [partner3, "https://www.brandafrica.org/"],
            [partner4, "https://glovoapp.com/"],
            [partner5, "https://about.meta.com/"],
            [partner6, "https://sages.africa/"],
            [partner7, "https://um6p.ma/"],
          ].map(([image, link], index) => (
            <Link
              className="aspect-square w-[calc(calc(100%-calc(2*1.5rem))/3)] md:w-[calc(calc(100%-calc(4*2.5rem))/5)] lg:w-[calc(calc(100%-calc(7*4rem))/8)]"
              to={link}
              target="_blank"
            >
              <img
              loading="lazy"
                key={index}
                className="size-full"
                src={image}
                alt={`sponsor-${index}`}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
