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
        en: "Y.E.S Africa (Youth Empowerment Summit Africa) is a crucial initiative addressing the growing challenge of NEET (Not in Education, Employment, or Training) youth in Africa, projected to exceed 70 million by 2025. This alarming trend threatens not only the future of these young individuals but also the continent as a whole. Y.E.S Africa aims to transform this situation from 70 million NEETs to 70 million Doers by fostering collaboration among civil society leaders, local communities, and private sector stakeholders.",
        ar: "قمة تمكين الشباب في أفريقيا هي مبادرة هامة تتصدى للتحدي المتزايد للشباب الذين لا يتلقون التعليم أو التدريب أو يعملون في أفريقيا، والمتوقع أن يتجاوز عددهم 70 مليون بحلول عام 2025. هذا الاتجاه المقلق لا يهدد فقط مستقبل هؤلاء الشباب، بل يهدد أيضًا مستقبل القارة بأكملها. تهدف المبادرة إلى تحويل هذا الوضع من 70 مليون شاب إلى 70 مليون صانع من خلال تعزيز التعاون بين قادة المجتمع المدني، والمجتمعات المحلية، وأصحاب المصلحة في القطاع الخاص."},
    },
    {
      img: hero2,
      title: { en: "Youth Empowerment Summit, Africa", ar: "قمة تكوين الشباب. أفريقيا" },
      desc: {
        en: "A substantial and focused investment in Africa's human capital, paired with comprehensive reforms aimed at enhancing the business environment, is essential for African governments to attract increased foreign investment. This dual approach not only bolsters economic growth but also mitigates the potential for political instability that often accompanies high unemployment rates.",
        ar: "إن الاستثمار الكبير والمركّز في رأس المال البشري في أفريقيا، إلى جانب الإصلاحات الشاملة التي تهدف إلى تحسين بيئة الأعمال، ضروري لحكومات أفريقيا لجذب المزيد من الاستثمارات الأجنبية. هذا النهج المزدوج لا يعزز النمو الاقتصادي فحسب، بل يخفف أيضًا من احتمالية حدوث عدم استقرار سياسي الذي غالبًا ما يصاحب معدلات البطالة المرتفعة.",
      },
    },
    {
      img: hero3,
      title: { en: "Youth Empowerment Summit, Africa", ar: "قمة تكوين الشباب. أفريقيا" },
      desc: {
        en: "Join us at Y.E.S Africa and be part of the solution! Our initiative focuses on empowering the youth of Africa by creating opportunities for education, employment, and skills development. Together, we can turn the tide on the NEET crisis, transforming young lives and building a brighter future for the continent. Through collaboration and innovation, we aim to cultivate a new generation of leaders and change-makers, ensuring that every young person has the chance to thrive. Let’s work together to make the vision of 70 million Doers a reality!",
        ar: "انضموا إلينا في قمة تمكين الشباب في أفريقيا وكونوا جزءًا من الحل! تركز مبادرتنا على تمكين شباب أفريقيا من خلال خلق فرص للتعليم والتوظيف وتطوير المهارات. معًا، يمكننا التغلب على أزمة الشباب الذين لا يتلقون التعليم أو التدريب أو يعملون، وتحويل حياتهم نحو الأفضل وبناء مستقبل أكثر إشراقًا للقارة. من خلال التعاون والابتكار، نسعى إلى تنمية جيل جديد من القادة وصنّاع التغيير، وضمان أن يحصل كل شاب على فرصة للنجاح. دعونا نعمل معًا لتحقيق رؤية 70 مليون صانع!"},
    },
    // {
    //   img: hero4,
    //   title: { en: "Youth Empowerment Summit, Africa", ar: "قمة تكوين الشباب. أفريقيا" },
    //   desc: {
    //     en: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium sunt dolor voluptatem quam odit ad ea, hic harum dolore ipsa? Repudiandae ad aperiam nemo enim aliquam temporibus quo veniam ab.",
    //     ar: "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.",
    //   },
    // },
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
