import React from "react";

const UseZoomIn = (duration = 0.5, scale = 0.95) => {
  return {
    initial: { scale, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration, ease: "easeOut" },
  };
};

export default UseZoomIn;
