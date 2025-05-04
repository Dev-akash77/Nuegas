import React from 'react';

const Stacked_Avtar = ({ arr, imageperview }) => {
  const avatarSize = 28; 
  const overlap = 22;

  return (
    <div className="flex items-center relative cursor-pointer" style={{ width: `${imageperview * overlap + avatarSize}px` }}>
      {arr?.slice(0, imageperview).map((cur, index) => (
        <img
          key={index}
          src={cur.image}
          alt="member"
          className="w-8 h-8 rounded-full border-2 border-white object-cover absolute"
          style={{ left: `${index * overlap}px`, zIndex: 10 - index }}
        />
      ))}

      {/* Extra count circle */}
      {arr.length > imageperview && (
        <div
          className="w-8 h-8 rounded-full bg-gray-200 text-sm text-black flex items-center justify-center border-2 border-white absolute z-10"
          style={{ left: `${imageperview * overlap}px`, zIndex: 1 }}
        >
          +{arr.length - imageperview}
        </div>
      )}
    </div>
  );
};

export default Stacked_Avtar;
