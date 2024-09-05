import deuxM from "../../../assets/images/sponsors/2M_Logo.svg.png"
import lionsgeek from "../../../assets/images/sponsors/lionsgeek.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import TransText from "../../../components/TransText";

import 'swiper/css';
import 'swiper/css/pagination';
const Sponsors = () => {

    const title = { en: "Our Sponsors", ar: "رعاة الحدث" }

    return (
        <section className="h-[40vh] py-4">
            <h2 className="text-center text-4xl font-bold my-2">
                <TransText {...title} />
            </h2>
            <div className="flex items-center justify-around gap-4 min-h-[90%]">
                <Swiper
                    className='h-full'
                    slidesPerView={5}
                    speed={3000}
                    freeMode={true}

                    loop={true}
                    autoplay={{
                        delay: 100,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay, FreeMode]}

                >

                    {
                        [1, 2, 3, 4, 5, 6].map((spons, index) => (
                            <SwiperSlide
                                className='h-[10vh] flex items-center' key={index}>
                                    <img src={index % 2 ? deuxM : lionsgeek} className="w-[75px]" alt="" />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

        </section>
    )
}

export default Sponsors;