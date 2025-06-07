import React, { cloneElement } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//! Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// !import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Swiper_component = ({ data, component, delay }) => {
  return (
    <Swiper
      spaceBetween={10}
      // pagination={{ dynamicBullets: true }}
      autoplay={{
        delay: delay,
        disableOnInteraction: true,
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 3 },
      }}
      modules={[Pagination, Autoplay]}
    >
      {data?.map((cur, id) => (
        <SwiperSlide key={id} className="py-1 px-1 mt-3">
          {" "}
          {cloneElement(component, { id: id, data: cur, fixWidth: true })}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Swiper_component;
