import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import TransText from "../../components/TransText";
import { useAppContext } from "../../context/AppContext";
export const ContactUs = () => {
  const { selectedLanguage } = useAppContext();
  return (
    <div
      className={`flex gap-5 py-[10vh] px-[5vw] lg:flex-row flex-col ${selectedLanguage == "ar" ? "lg:flex-row-reverse" : ""
        }`}
    >
      <div
        className={`lg:w-[50%] flex flex-col gap-5 ${selectedLanguage == "ar" ? "text-right items-end" : ""
          }`}
      >
        <p className="text-3xl font-medium">
          <TransText en="Contact Us" ar="تواصل معنا" />
        </p>
        <p className="text-lg w-[90%]">
          <TransText
            en="Do you have any questions? Need more information? 
Fill out our contact form available in multiple languages, or connect with us via social media. You can also call or email us, and we will get back to you as soon as possible."
            ar="هل لديك أي أسئلة؟ هل تحتاج إلى مزيد من المعلومات؟ املأ نموذج الاتصال الخاص بنا المتاح بعدة لغات، أو تواصل معنا عبر وسائل التواصل الاجتماعي. يمكنك أيضًا الاتصال بنا أو إرسال بريد إلكتروني، وسنرد عليك في أقرب وقت ممكن"
          />
        </p>
        <div
          className={`flex gap-2 items-center text-lg ${selectedLanguage == "ar" ? "flex-row-reverse" : ""
            }`}
        >
          <BsTelephone className="font-bold" />
          <p>+212 666 059 258</p>
        </div>
        <div
          className={`flex gap-2 items-center text-lg ${selectedLanguage == "ar" ? "flex-row-reverse" : ""
            }`}
        >
          <MdOutlineMail className="font-bold" />
          <p>Developpement@jadara.foundation</p>
        </div>
        <div className="flex gap-5 text-2xl">
          <a target="_blank" href="https://www.facebook.com/profile.php?id=61567349305436">
            <FiFacebook className="cursor-pointer" />
          </a>
          <a target="_blank" href="https://x.com/yes_summit?s=21&t=7jqpIPumaHca8lonoHm8Uw">
            <FaXTwitter className="cursor-pointer" />
          </a>
          <a target="_blank" href="https://www.instagram.com/yes_summit_africa/">
            <FaInstagram className="cursor-pointer" />
          </a>
        </div>
      </div>
      <div className={`lg:w-[50%] flex flex-col gap-3 `}>
        <div
          className={`flex flex-col gap-2 ${selectedLanguage == "ar" ? "text-right" : ""
            }`}
        >
          <label htmlFor="">
            <TransText en="Full name" ar="الاسم الكامل" />
          </label>
          <input
            className={`p-2 border rounded-lg ${selectedLanguage == "ar" ? "text-right" : ""
              }`}
            type="text"
            placeholder={
              selectedLanguage == "ar" ? "الاسم الكامل" : "Your name"
            }
          />
        </div>
        <div
          className={`flex flex-col gap-2 ${selectedLanguage == "ar" ? "text-right" : ""
            }`}
        >
          <label htmlFor="">
            <TransText ar="البريد الالكتروني" en="Email" />
          </label>
          <input
            className={`p-2 border rounded-lg float-right ${selectedLanguage == "ar" ? "text-right" : ""
              }`}
            type="email"
            placeholder="Your@email.com"
          />
        </div>
        <div
          className={`flex flex-col gap-2 ${selectedLanguage == "ar" ? "text-right" : ""
            }`}
        >
          <label htmlFor="">
            <TransText ar="رقم الهاتف" en="Phone number" />
          </label>
          <input
            className={`p-2 border rounded-lg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none ${selectedLanguage == "ar" ? "text-right" : ""
              }`}
            type="number"
            placeholder="+33 125 578987"
          />
        </div>
        <div
          className={`flex flex-col gap-2 ${selectedLanguage == "ar" ? "text-right" : ""
            }`}
        >
          <label htmlFor="">
            {" "}
            <TransText ar="رسالة" en="Message" />
          </label>
          <textarea
            className={`p-2 border rounded-lg ${selectedLanguage == "ar" ? "text-right" : ""
              }`}
            placeholder={
              selectedLanguage == "ar" ? " رسالتك هنا" : "Your message here ..."
            }
            rows={5}
            name=""
            id=""
          ></textarea>
        </div>
        <button className="bg-black text-white py-3 rounded-lg">
          <TransText ar="إرسال" en="Submit" />
        </button>
      </div>
    </div>
  );
};
