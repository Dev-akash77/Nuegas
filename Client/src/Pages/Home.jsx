import React from "react";
import Heading_page from "../Common/Heading_page";
import Activity from "../Components/Activity";
import Chart from "../Components/Chart";
import Members from "../Common/Members";
import { Swiper, SwiperSlide } from "swiper/react";
//! Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../index.css"
// !import required modules
import { Pagination ,Autoplay} from "swiper/modules";

const Home = () => {
  
  return (
    <div className="w-full h-full">
      {/* ! headoing */}
      <Heading_page />

      <div className="my-7 flex items-center justify-between gap-5 h-[15rem]">
        {/* Activity Task*/}
        <Activity />
        {/* chart */}
        <Chart />
      </div>

      {/* monthly mentors */}
      <div className="mt-5 pb-10">
  <h2 className="text-xl font-medium">Monthly Mentors</h2>
  <Swiper
    spaceBetween={10}
    pagination={{ dynamicBullets: true }}
    autoplay={{
      delay: 1500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 3 },
    }}
    modules={[Pagination, Autoplay]}
    className="mt-5"
  >
    {[1, 3, 4, 2, 6, 4, 5, 6].map((id) => (
      <SwiperSlide key={id}>
        <Members />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    </div>
  );
};

export default Home;
