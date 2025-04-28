import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

const FacesCarousel = ({ videos }) => {
  return (
    <Swiper
      className="w-full lg:w-[40%]"
      loop={true}
      speed={1000}
      freeMode={true}
      modules={[Navigation]}
      navigation
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
