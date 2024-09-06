import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransText from "../../components/TransText";
import { useAppContext } from "../../context/AppContext";

const ArticlePage = () => {
  const { blogs, selectedLanguage } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const tags = [
    { en: "Youth Civil Society", ar: "المجتمع المدني الشبابي" },
    { en: "Community Development", ar: "المجتمع المدني الشبابي" },
    { en: "Grassroots Organisations", ar: " المنظمات القاعدية " },
    { en: "Access to Funding", ar: "المجتمع المدني الشبابي" },
    { en: "Decision-Making Power", ar: "قوة اتخاذ القرار" },
  ];

  return (
    <div
      className={`flex lg:flex-row flex-col justify-center p-10 ${
        selectedLanguage == "ar" ? "lg:flex-row-reverse text-right" : ""
      }`}
    >
      <div className="lg:w-[70%]">
        <img className="rounded-lg h-[55%] w-full object-cover" src={blogs[id].image} alt="" />
        <div className="py-5 flex flex-col gap-5">
          <h1 className="text-3xl font-bold">{blogs[id].title}</h1>
          <p className="text-lg">
            <TransText ar={blogs[id].description.ar} en={blogs[id].description.en} />
          </p>
        </div>
        <h1 className="font-bold text-xl mb-[1.5vh]">
          <TransText ar=" الكلمات المفتاحية" en="Tags" />
        </h1>
        <div
          className={`flex lg:flex-row flex-col gap-3 ${
            selectedLanguage == "ar" ? "lg:justify-end items-end" : ""
          } `}
        >
          {tags.map((e, i) => (
            <div key={i} className={`bg-gray-200 px-3 py-2 rounded-lg w-fit `}>
              {<TransText ar={e.ar} en={e.en} />}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-[30%] lg:px-5 flex flex-col gap-3">
        <h1 className="text-xl font-semibold">
          <TransText ar="الأكثر شعبية" en="Populer Posted" />
        </h1>
        {blogs.map(
          (e, index) =>
            index != id && (
              <div
                key={index}
                onClick={() => navigate(`/articles/${index}`)}
                className="bg-slate-100 w-full flex rounded-lg p-2 gap-4 cursor-pointer"
              >
                <img src={e.image} className="w-[40%] object-cover rounded-md" alt="" />
                <div className="">
                  <h1 className="font-bold">{e.title}</h1>
                  <p>
                    {e.description.en.length > 155 ? (
                      <TransText
                        ar={e.description.ar.substring(0, 60) + "..."}
                        en={e.description.en.substring(0, 60) + "..."}
                      />
                    ) : (
                      <TransText ar={e.description.ar} en={e.description.en} />
                    )}
                  </p>
                  <div className="flex text-sm text-black/75 gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <p>{e.date}</p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
