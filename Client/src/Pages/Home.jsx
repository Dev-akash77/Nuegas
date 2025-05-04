import React from "react";
import Heading_page from "../Common/Heading_page";
import Activity from "../Components/Activity";
import Chart from "../Components/Chart";
import Members from "../Common/Members";
import Swiper_component from "../Common/Swiper_component";
import Heading from "../Common/Heading";
import Taks_upcoming from './../Common/Taks_upcoming';
import { useTaskContext } from "../Context/Task_Context";

const Home = () => {
  const {allUserData} = useTaskContext();
  return (
    <div className="w-full h-full">
      {/* ! headoing */}
      <Heading_page />

      <div className="my-7 flex md:flex-row flex-col items-center justify-between gap-5 md:h-[15rem]">
        {/* Activity Task*/}
        <Activity />
        {/* chart */}
        <Chart />
      </div>

      {/* monthly mentors */}
      <div className="mt-5 pb-10">
        <Heading text={"Monthly Mentors"} />
        <Swiper_component data={allUserData?.alluser} component={<Members />} delay={1500} />
      </div>

      {/* Upcoming Task */}
      <div className="pb-5">
        <Heading text={"Upcoming Task"}/>
        <Swiper_component data={[1,2,3,4,5,6,7,3,5]} component={<Taks_upcoming />} delay={3000} />
      </div>
    </div>
  );
};

export default Home;
