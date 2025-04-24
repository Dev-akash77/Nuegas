import React from "react";

const HelpCard = () => {
  return (
    <div className="bg-black rounded-md py-3 px-1 h-[15rem] text-white w-[95%] relative items-center flex flex-col seudo_help">
      <h1 className="text-lg cc mt-7">Help Center</h1>
      <p className="w-full text-center mt-3 text-sm">
        Having Trouble in Learning. Please contact us for more questions.
      </p>
      <button className="bg-white rounded-md py-3 text-black px-4 mt-3 cursor-pointer absolute bottom-5">
        Go To Help Center
      </button>

      <div className="rounded-full h-[3.5rem] w-[3.5rem] bg-white absolute -top-[2rem] cc">
        <div className="rounded-full h-[3rem] w-[3rem] bg-black cc text-4xl font-semibold">?</div>
      </div>
    </div>
  );
};

export default HelpCard;
