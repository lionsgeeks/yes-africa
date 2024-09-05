import { CiCalendar } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";
import { useAppContext } from "../../../context/AppContext";
import TransText from "../../../components/TransText";
import { Link } from "react-router-dom";


const EventInfo = () => {
    const { selectedLanguage } = useAppContext()

    const eventInformation = [
        {
            icon: <CiCalendar />,
            text: { en: 'June 15, 2023 - June 17, 2023', ar: '15 يونيو 2023 - 17 يونيو 2023' }
        },
        {
            icon: <GoClock />,
            text: { en: '9:00 AM - 5:00 PM', ar: '9:00 ص - 5:00 م' }
        },
        {
            icon: <MdMyLocation />,
            text: { en: 'African Youth Empowerement Summit', ar: 'قمة تمكين الشباب الأفارقة' }
        },
    ]

    const text = [
        {
            title: { en: "Information About The Event", ar: "معلومات عن الحدث" },
            desc: { en: "Join us for a celebration of African youth culture and empowerment. The event will feature inspiring speajers, interactive workshops, and live performances.", ar: "انضم إلينا للاحتفال بثقافة الشباب الإفريقي وتمكينهم. سيشمل الحدث متحدثين ملهمين، وورش عمل تفاعلية، وعروض حية." },
            aboutBtn: { en: "About Summit", ar: "حول الملتقى" },
            contactBtn: { en: "Contact Us", ar: "اتصل بنا" }
        }
    ]

    return (
        <section className={`min-h-[30vh] bg-alpha rounded-2xl flex lg:flex-row flex-col items-center gap-5 justify-around text-white mt-4 p-6 lg:mx-12
        ${selectedLanguage === "ar" ? "flex-row-reverse" : ""}`}>
            <div className={`lg:w-[50%] ${selectedLanguage == "ar" ? "text-end justify-end" : ""}`}>
                {
                    text.map(({ title, desc, aboutBtn, contactBtn }, index) => (
                        <div className="flex flex-col gap-4" key={index}>

                            <h1 className="text-4xl font-bold">
                                <TransText {...title} />
                            </h1>
                            <p>
                                <TransText {...desc} />
                            </p>
                            <br />
                            <div className={`flex items-center gap-4 text-xl ${selectedLanguage === "ar" ? "justify-end" : ""}`}>
                                <Link
                                    to={"/about"}
                                >
                                    <button className="px-4 py-2 text-white bg-beta rounded">
                                        <TransText {...aboutBtn} />
                                    </button>
                                </Link>

                                <Link
                                    to={"/contact"}
                                >
                                    <button className="px-4 py-2 text-black bg-white rounded">
                                        <TransText {...contactBtn} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={`lg:w-[40%] flex flex-col gap-3 ${selectedLanguage === "ar" ? "items-end" : "items-start"}`}>
                {
                    eventInformation.map(({ icon, text }, index) => (
                        <div 
                        key={index}
                        className={`flex items-center gap-2 text-xl ${selectedLanguage === "ar" ? "flex-row-reverse " : ""}`}>
                            {icon}
                            <p>
                                <TransText {...text} />
                            </p>
                        </div>
                    ))
                }

            </div>
        </section>
    )
}

export default EventInfo;