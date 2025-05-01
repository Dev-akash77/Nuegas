import React from "react";
import Element_Loader from "./Element_Loader";

const Button = ({ text, loading, type }) => {
  return (
    <button
      type={type || "button"}
      className={`ui_button w-full h-full cc relative ${
        loading && "bg-default"
      }`}
    >
      {loading ? <Element_Loader /> : text}
    </button>
  );
};

export default Button;
