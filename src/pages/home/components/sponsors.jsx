import deuxM from "../../../assets/images/sponsors/2M_Logo.svg.png";
import lionsgeek from "../../../assets/images/sponsors/lionsgeek.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import TransText from "../../../components/TransText";

import "swiper/css";
import "swiper/css/pagination";
import { useAppContext } from "../../../context/AppContext";

const Sponsors = () => {
  const title = { en: "Our Sponsors", ar: "رعاة الحدث" };
  const { selectedLanguage } = useAppContext();

  return (
    <section className="px-8 md:px-12 lg:px-16 pt-8 md:pt-10 lg:pt-14 pb-16 md:pb-20 lg:pb-28">
      <h2
        className={`text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none mb-6 ${
          selectedLanguage === "ar" && "text-end"
        }`}
      >
        <TransText {...title} />
      </h2>
      <div className="flex items-center justify-around gap-4">
        <Swiper
          slidesPerView={window.innerWidth <= 430 ? 2 : 5}
          speed={3000}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 100,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, FreeMode]}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide className="aspect-[1/0.5] flex items-center justify-center" key={index}>
              <img
                src={index % 2 ? deuxM : lionsgeek}
                className=" w-[75px]"
                alt={index % 2 ? "2M" : "Lionsgeek"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Sponsors;
