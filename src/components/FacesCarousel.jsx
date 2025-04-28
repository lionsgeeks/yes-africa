import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

const FacesCarousel = ({ videos }) => {
  return (
    <Swiper
      className="w-full lg:w-[40%]"
      loop={true}
      speed={3000}
      freeMode={true}
      modules={[FreeMode, Navigation]}
      navigation
      scrollbar={{ draggable: true }}
      // breakpoints={
      //   {
      //     0: {
      //       slidesPerView: 1,
      //       spaceBetween: 10,
      //     },
      //     640: {
      //       slidesPerView: 2,
      //       spaceBetween: 20,
      //     },
      //     768: {
      //       slidesPerView: 3,
      //       spaceBetween: 30,
      //     },
      //     1024: {
      //       slidesPerView: 4,
      //       spaceBetween: 40,
      //     },
      //   }
      // }
    >
      {videos?.map((video, index) => (
        <SwiperSlide className="flex items-center justify-center" key={index}>
          <iframe
            width="324"
            height="576"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FacesCarousel;
