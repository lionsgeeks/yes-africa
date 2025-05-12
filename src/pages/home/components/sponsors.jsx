import ucgc from "../../../assets/images/sponsors/ucgc.jpg";
import lionsgeek from "../../../assets/images/sponsors/lionsgeek.png";
import jadara from "../../../assets/images/sponsors/Jadaralogo.png";
import epic from "../../../assets/images/sponsors/epic-afric.jpg";
import pan from "../../../assets/images/sponsors/pan.jpeg";
import spo1 from "../../../assets/images/sponsors/1.jpeg";
import spo2 from "../../../assets/images/sponsors/2.jpeg";
import spo3 from "../../../assets/images/sponsors/3.jpeg";
import spo4 from "../../../assets/images/sponsors/4.jpeg";
import spo5 from "../../../assets/images/sponsors/5.jpeg";
import Africa_50 from "../../../assets/images/sponsors/Africa_50.jpg";
// import smala from "../../../assets/images/sponsors/happylogo.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import TransText from "../../../components/TransText";

import "swiper/css";
import "swiper/css/pagination";
import { useAppContext } from "../../../context/AppContext";

const Sponsors = () => {
  const title = {
    en: "They said yes to africa",
    ar: "قالوا نعم لأفريقيا",
    fr: "Ils ont dit oui à l'Afrique"
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
          loop={true}
          speed={3000}
          freeMode={true}
          autoplay={{
            delay: 100,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, FreeMode]}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {
            [  lionsgeek,  spo1 , spo2 , spo3 , spo4 , spo5 , Africa_50].map((spon, index) => (
              <SwiperSlide className="lg:aspect-[1/0.5] aspect-[1/1.5] bg-yellow- flex items-center justify-center" key={index}>
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
