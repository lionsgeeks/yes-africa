import { Link } from "react-router-dom";
import { TransText } from "../../../components";
import { Imgs } from "../../../constants";
import { useAppContext } from "../../../context/AppContext";

export const SponsorsSection = () => {
  const { selectedLanguage } = useAppContext();

  return (
    <>
      <section
        className={`px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${
          selectedLanguage == "ar" && "text-end"
        }`}
      >
        <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
          <TransText en="Partners & Sponsors" ar="الشركاء والممولون" />
        </h2>
        <div
          className={`flex flex-wrap px-4 gap-x-6 gap-y-8 md:px-6 md:gap-x-10 lg:gap-x-16 lg:px-12 ${
            selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {[
            ["AG-Partners.png", "https://publicisgroupeafrica.com/"],
            ["Amazon-Web-Services.png", "https://aws.amazon.com/"],
            ["Brand-AFRICA.png", "https://www.brandafrica.org/"],
            ["Glovo-logo-Green.png", "https://glovoapp.com/"],
            ["Meta_Lockup_PositivePrimary_RGB.png", "https://about.meta.com/"],
            ["Sages-Noir.png", "https://sages.africa/"],
            ["UM6P-Primary-Lockup-Web.png", "https://um6p.ma/"],
          ].map(([image, link], index) => (
            <Link
              className="aspect-square w-[calc(calc(100%-calc(2*1.5rem))/3)] md:w-[calc(calc(100%-calc(4*2.5rem))/5)] lg:w-[calc(calc(100%-calc(7*4rem))/8)]"
              to={link}
              target="_blank"
            >
              <img
                key={index}
                className="size-full"
                src={Imgs.getImageUrl(image, "partners-sponsors")}
                alt={`sponsor-${index}`}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
