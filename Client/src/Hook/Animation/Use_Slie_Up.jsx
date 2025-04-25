import React from 'react'

const Use_Slie_Up = (yOffset = 40, duration = 0.6, delay = 0) => {
    return {
      initial: { y: yOffset, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration, delay, ease: "easeOut" },
    };
  };

export default Use_Slie_Up