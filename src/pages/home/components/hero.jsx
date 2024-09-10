import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import hero1 from "../../../assets/images/heroCarousel/hero1.jpg";
import hero2 from "../../../assets/images/heroCarousel/hero2.jpg";
import hero3 from "../../../assets/images/heroCarousel/hero3.jpg";
import hero4 from "../../../assets/images/heroCarousel/hero4.jpg";
import { useAppContext } from "../../../context/AppContext";
import TransText from "../../../components/TransText";

const Hero = () => {
  const { selectedLanguage } = useAppContext();

  const slides = [
    {
      img: hero1,
      title: { en: "Youth Empowerment Summit, Africa", ar: "قمة تكوين الشباب. أفريقيا" },
      desc: {
        en: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium sunt dolor voluptatem quam odit ad ea, hic harum dolore ipsa? Repudiandae ad aperiam nemo enim aliquam temporibus quo veniam ab.",
        ar: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.",
      },
    },
    {
      img: hero2,
      title: { en: "Youth Empowerment Summit, Africa", ar: "قمة تكوين الشباب. أفريقيا" },
      desc: {
        en: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium sunt dolor voluptatem quam odit ad ea, hic harum dolore ipsa? Repudiandae ad aperiam nemo enim aliquam temporibus quo veniam ab.",
        ar: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.",
      },
    },
    {
      img: hero3,
      title: { en: "Youth Empowerment Summit, Africa", ar: "قمة تكوين الشباب. أفريقيا" },
      desc: {
        en: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium sunt dolor voluptatem quam odit ad ea, hic harum dolore ipsa? Repudiandae ad aperiam nemo enim aliquam temporibus quo veniam ab.",
        ar: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.",
      },
    },
    {
      img: hero4,
      title: { en: "Youth Empowerment Summit, Africa", ar: "قمة تكوين الشباب. أفريقيا" },
      desc: {
        en: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium sunt dolor voluptatem quam odit ad ea, hic harum dolore ipsa? Repudiandae ad aperiam nemo enim aliquam temporibus quo veniam ab.",
        ar: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.",
      },
    },
  ];

  return (
    <div className="h-[75vh] cursor-grab">
      <Swiper
        className="h-full"
        slidesPerView={1}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Navigation]}
      >
        {slides.map(({ img, title, desc }, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
              }}
            >
              <div
                className={`flex items-center w-full h-full bg-black/40 text-white 
                            ${selectedLanguage === "ar" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`lg:w-[40%] ${
                    selectedLanguage === "ar" ? "lg:mr-24 mr-5" : "lg:ml-24 ml-5"
                  }`}
                >
                  <div className={`${selectedLanguage === "ar" ? "text-end" : ""}`}>
                    <h1 className={`lg:text-5xl text-2xl gap-1 font-bold flex flex-col `}>
                      <span>
                        <TransText en="Youth" ar="قمة" />
                      </span>
                      <span>
                        <TransText en="Empowerment" ar="تكوين" />
                      </span>
                      <span>
                        <TransText en="Summit" ar=" شباب" />
                        <span className="text-xl lg:text-3xl font-normal mx-6">
                          <TransText en="Africa" ar=" أفريقيا " />
                        </span>
                      </span>
                    </h1>
                    <br />
                    <p className="lg:text-lg">
                      <TransText {...desc} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
