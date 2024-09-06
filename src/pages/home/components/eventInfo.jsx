import { CiCalendar } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";
import { useAppContext } from "../../../context/AppContext";
import TransText from "../../../components/TransText";
import { Link } from "react-router-dom";

const EventInfo = () => {
  const { selectedLanguage } = useAppContext();

  const eventInformation = [
    {
      icon: <CiCalendar />,
      text: { en: "June 15, 2023 - June 17, 2023", ar: "15 يونيو 2023 - 17 يونيو 2023" },
    },
    {
      icon: <GoClock />,
      text: { en: "9:00 AM - 5:00 PM", ar: "9:00 ص - 5:00 م" },
    },
    {
      icon: <MdMyLocation />,
      text: { en: "African Youth Empowerement Summit", ar: "قمة تمكين الشباب الأفارقة" },
    },
  ];

  const text = [
    {
      title: { en: "Information About The Event", ar: "معلومات عن الحدث" },
      desc: {
        en: "Join us for a celebration of African youth culture and empowerment. The event will feature inspiring speajers, interactive workshops, and live performances.",
        ar: "انضم إلينا للاحتفال بثقافة الشباب الإفريقي وتمكينهم. سيشمل الحدث متحدثين ملهمين، وورش عمل تفاعلية، وعروض حية.",
      },
      aboutBtn: { en: "About Summit", ar: "حول الملتقى" },
      contactBtn: { en: "Contact Us", ar: "اتصل بنا" },
    },
  ];

  return (
    <section
      className={`py-16 md:py-20 lg:py-24 bg-black rounded-2xl flex flex-col lg:items-center gap-12 lg:gap-5 justify-around text-white my-6 lg:my-16 p-6 mx-3 lg:mx-16
        ${selectedLanguage === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <div className={`lg:w-[50%] ${selectedLanguage == "ar" && "text-end justify-end"}`}>
        {text.map(({ title, desc, aboutBtn, contactBtn }, index) => (
          <div className="flex flex-col gap-4" key={index}>
            <h1 className="text-2xl font-semibold tracking-tighter md:text-3xl lg:text-4xl/none">
              <TransText {...title} />
            </h1>
            <p className="text-gray-100 md:text-base/relaxed lg:text-lg/snug">
              <TransText {...desc} />
            </p>

            <div
              className={`mt-4 flex items-center gap-4 ${
                selectedLanguage === "ar" && "flex-row-reverse"
              }`}
            >
              <Link to={"/about"}>
                <button className="bg-white border-2 lg:text-lg text-black border-white hover:border-gamma hover:bg-gamma hover:text-white px-8 py-2.5 w-fit rounded-lg lg:font-medium">
                  <TransText {...aboutBtn} />
                </button>
              </Link>

              <Link to={"/contact"}>
                <button className="bg-transparent border-2 lg:text-lg text-white border-white  hover:border-gamma hover:text-gamma px-8 py-2.5 w-fit rounded-lg font-medium transition-[background-color] duration-[700ms]">
                  <TransText {...contactBtn} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`lg:w-[40%] flex flex-col gap-3 ${
          selectedLanguage === "ar" ? "items-end" : "items-start"
        }`}
      >
        {eventInformation.map(({ icon, text }, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${selectedLanguage === "ar" && "flex-row-reverse"}`}
          >
            {icon}
            <p className="text-gray-100 md:text-base/relaxed lg:text-lg/snug">
              <TransText {...text} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventInfo;
