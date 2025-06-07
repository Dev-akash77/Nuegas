import React, { Suspense } from "react";
import Heading_page from "../Common/Heading_page";
import Activity from "../Components/Activity";
import Chart from "../Components/Chart";
import Heading from "../Common/Heading";
import { useTaskContext } from "../Context/Task_Context";
import Swiper_component from "./../Common/Swiper_component";

const Taks_upcoming = React.lazy(() => import("./../Common/Taks_upcoming"));
const Members = React.lazy(() => import("./../Common/Members"));

const Home = () => {
  const { allUserData, allTaskData } = useTaskContext();
  return (
    <div className="w-full h-full cc page_height_gap">
      <div className="container">
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

          {/* <div className="flex items-start justify-start overflow-x-auto gap-5 py-2 px-1">
            {
              allUserData?.alluser.map((cur,id)=>{
                return <Members data={cur} id={id} fixWidth={true} key={id}/>
              })
            }
          </div> */}
          <Suspense
            fallback={
              <div className="text-center text-gray-400">Loading Members...</div>
            }
          >
            <Swiper_component
              data={allUserData?.alluser}
              component={<Members />}
              delay={1500}
            />
          </Suspense>
        </div>

        {/* Upcoming Task */}
        <div className="pb-5">
          <Heading text={"Upcoming Task"} />
          {/* <div className="flex items-start justify-start overflow-x-auto gap-5 py-2 px-1">
            {
              allTaskData?.allTasks.map((cur,id)=>{
                return <Taks_upcoming data={cur} id={id} fixWidth={true} key={id}/>
              })
            }
          </div> */}
          <Suspense
            fallback={
              <div className="text-center text-gray-400">Loading tasks...</div>
            }
          >
            <Swiper_component
              data={allTaskData?.allTasks}
              component={<Taks_upcoming />}
              delay={3000}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
