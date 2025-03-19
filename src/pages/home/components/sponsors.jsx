import ucgc from "../../../assets/images/sponsors/ucgc.jpg";
import lionsgeek from "../../../assets/images/sponsors/lionsgeek.png";
import jadara from "../../../assets/images/sponsors/Jadaralogo.png";
import epic from "../../../assets/images/sponsors/epic-afric.jpg";
import pan from "../../../assets/images/sponsors/pan.jpeg";
// import smala from "../../../assets/images/sponsors/happylogo.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import TransText from "../../../components/TransText";

import "swiper/css";
import "swiper/css/pagination";
import { useAppContext } from "../../../context/AppContext";

const Sponsors = () => {
  const title = {
    en: "Our Partners",
    ar: "شركاؤنا",
    fr: "Nos Partenaires"
  };
  const { selectedLanguage } = useAppContext();

  return (
    <section className="px-8 md:px-12 lg:px-16 pt-8 md:pt-10 lg:pt-14 pb-16 md:pb-20 lg:pb-28">
      <h2
        className={`text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none mb-6 ${selectedLanguage === "ar" && "text-end"
          }`}
      >
        <TransText {...title} />
      </h2>
      <div className="flex items-center justify-around gap-4">
        <Swiper
          slidesPerView={2}
          loop={true}
          speed={3000}
          freeMode={true}
          autoplay={{
            delay: 100,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, FreeMode]}
        >
          {
            [ucgc,  lionsgeek, ].map((spon, index) => (
              <SwiperSlide className="lg:aspect-[1/0.5] aspect-[1/2] bg-yellow- flex items-center justify-center" key={index}>
                <img
                  src={spon}
                  className={`${spon == ucgc ? 'w-[200px]' : spon == epic ? "w-[400px]" : 'w-[140px]'}`}
                  alt=""
                />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>
  );
};

export default Sponsors;
