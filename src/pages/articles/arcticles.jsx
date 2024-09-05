import React from "react";
import africa1 from "../../assets/images/africa1.jpg";
import africa2 from "../../assets/images/africa2.jpg";
import africa3 from "../../assets/images/africa3.jpg";
import africa4 from "../../assets/images/africa4.jpg";
import africa5 from "../../assets/images/africa5.jpg";
import { useNavigate } from "react-router-dom";
import TransText from "../../components/TransText";
import { useAppContext } from "../../context/AppContext";
const ArticlesPage = () => {
  const { selectedLanguage } = useAppContext();
  const navigate = useNavigate();

  const blogs = [
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa1,
      date: "02/February/2023",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa2,
      date: "10/December/2023",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa3,
      date: "31/January/2022",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa4,
      date: "07/april/2023",
    },
    {
      title: "Yes Africa",
      description: {
        ar: `تستطيع منظمات المجتمع المدني الشبابية تعبئة وربط شبكات واسعة من الشباب القادرين على قيادة التغيير في المجتمعات حول العالم. هذه الشبكات من الشباب – الذين يشكلون غالبية السكان في معظم المجتمعات في الجنوب العالمي – يمكن أن تسهم في تحقيق نطاق التغيير المطلوب في التنمية. منظماتنا أيضًا في وضع فريد، حيث تكون هذه المنظمات في كثير من الحالات بمثابة شريان حياة للمجتمعات، حيث تمثل احتياجات المجتمع قبل كل شيء، وتساعد في سد الفجوة مع الهيئات الرسمية لصنع القرار، مثل الحكومات. مرنة وجذورها عميقة في المجتمعات، عادة ما تكون منظمات المجتمع المدني الشبابية في قلب المجتمعات، الأقرب إلى المشاكل والحلول الموجهة من قبل المجتمع. لكن، وفقًا للأبحاث التي أجرتها منظمة "Development Alternative"، فإن المجتمع المدني الشبابي بالكاد يبقى صامدًا، ولا يزدهر. التحديات تشمل الوصول إلى التمويل، التنسيق بين منظمات المجتمع المدني الشبابية والمنظمات غير الحكومية، والمنظمات غير الحكومية الدولية، والشركاء في التنمية؛ `,
        en: "Youth civil society organisations are able to mobilise and connect vast networks of young people who can lead change in communities around the world.  These networks of young people – who make up the majority of most communities in the global south- can help deliver the scale of change that we need to see in development.Our organisations are also in a unique position.  In many cases these organisations we are lifelines for communities, representing community needs above all else, and helping to bridge the gap with formal decision making bodies, such as governments.Agile and grassroots, youth civil society organisations are typically based at the heart of communities, closest to the problems and community-guided solutions.But, according to research carried out by the Development Alternative, youth civil society overall is just surviving, not thriving.   Challenges include access to funding, coordination between youth civil society organisations, NGOs, INGOs, and development partners; and a lack of power and access to decision-makers.",
      },
      image: africa5,
      date: "20/december/2024",
    },
  ];
  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-6 ${selectedLanguage == "ar" ? "rotate-180": ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
  return (
    <div className="">
      <div
        className={`w-full h-[50vh]  relative -z-20 text-white lg:px-16 flex flex-col justify-center gap-3 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/africa1.jpg')] ${
          selectedLanguage == "ar" ? "text-right items-end" : ""
        }`}
      >
        <div className="inset-0 absolute bg-gradient-to-r from-black via-[#53450ab5] via-50%  to-alpha opacity-85 -z-10"></div>
        <h1 className="lg:text-5xl text-3xl px-3 font-bold ">
          <TransText
            en="Explore Our Latest Articles"
            ar="استكشف أحدث مقالاتنا"
          />
        </h1>
        <p className="lg:text-4xl text-2xl px-3 lg:w-[70%] ">
          <TransText
            ar="اغمر نفسك في عالم من القصص المفيدة، والتحليلات المتخصصة، والرؤى المثيرة للتفكير"
            en="Dive into a world of insightful stories, expert analysis, and
          thought-provoking perspectives."
          />
        </p>
      </div>
      <div className="flex justify-center lg:px-16 px-3">
        <div className="flex flex-wrap lg:flex-row flex-col gap-5 py-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 lg:w-[calc(calc(100%-2.5rem)/3)] border rounded-lg shadow-sm ${selectedLanguage == 'ar' ? "text-right" : ""}`}
            >
              <img
                className="w-full h-[35vh] object-cover rounded-t-md"
                src={blog.image}
                alt=""
              />
              <div className={`p-3 gap-3 flex flex-col ${selectedLanguage == 'ar' ? "justify-end" : ""}`}>
                <h1 className="text-2xl font-bold">{blog.title}</h1>
                <div className={`flex text-sm text-black/75 gap-2 items-center ${selectedLanguage == 'ar' ? "justify-end" : ""}`}>
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
                  <p>{blog.date}</p>{" "}
                </div>
                <p className="text-lg ">
                  {blog.description.en.length > 155 ? (
                    <TransText
                      ar={blog.description.ar.substring(0, 155) + "..."}
                      en={blog.description.en.substring(0, 155) + "..."}
                    />
                  ) : (
                    <TransText
                      ar={blog.description.ar}
                      en={blog.description.en}
                    />
                  )}
                </p>
                <div className={`flex gap-3 flex-wrap font-medium text-sm ${selectedLanguage == 'ar' ? "justify-end" : ""}`}>
                  <p className="bg-gray-200 px-2 py-1 rounded-lg">
                    
                    <TransText ar="#قوة_اتخاذ_القرار" en="#Decision_Making_Power"/>
                  </p>
                  <p className="bg-gray-200 px-2 py-1 rounded-lg">
                    <TransText ar="#الوصول_إلى_التمويل " en="#Access_to_Funding"/>
                    
                  </p>
                </div>
                <div
                  onClick={() => navigate(`/articles/${index}`)}
                  className={`flex gap-2 items-center w-fit cursor-pointer font-bold ${selectedLanguage == 'ar' ? "flex-row-reverse" : ""}`}
                >
                  <h1>
                    <TransText ar="اقرأ المزيد" en="Read More"/>
                    </h1> {arrow}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-3 p-6">
        <div className="flex justify-center items-center gap-1 py-2 font-bold rounded-md">
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>

          <h1>Previous</h1>
        </div>
        <div className="flex gap-2">
          {[1].map((e, i) => (
            <div
              key={i}
              className="border-2 border-gray-200 flex justify-center items-center lg:size-[2.5vw] size-[8vw]  rounded-md"
            >
              {e}
            </div>
          ))}
        </div>
        <div className="flex justify-center py-2 px-2 rounded-md items-center font-bold gap-1">
          <p>Next</p>{" "}
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
