import React from "react";

const CustomTooltip = ({ active, label, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white text-xs px-3 py-2 rounded shadow-lg">
        <p className="font-semibold">Day: {label}</p>
        <p>Activity: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
