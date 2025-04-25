import React from 'react';

const Stacked_Avtar = ({ arr, imageperview }) => {
  const avatarSize = 28; 
  const overlap = 22;

  return (
    <div className="flex items-center relative" style={{ width: `${imageperview * overlap + avatarSize}px` }}>
      {arr.slice(0, imageperview).map((_, index) => (
        <img
          key={index}
          src="https://res.cloudinary.com/dekfjauox/image/upload/v1745469974/Qubiko_User/yn8vmoysy2evbjpnffwh.webp"
          alt="member"
          className="w-7 h-7 rounded-full border-2 border-white object-cover absolute"
          style={{ left: `${index * overlap}px`, zIndex: 10 - index }}
        />
      ))}

      {/* Extra count circle */}
      {arr.length > imageperview && (
        <div
          className="w-7 h-7 rounded-full bg-gray-200 text-sm text-black flex items-center justify-center border-2 border-white absolute"
          style={{ left: `${imageperview * overlap}px`, zIndex: 1 }}
        >
          +{arr.length - imageperview}
        </div>
      )}
    </div>
  );
};

export default Stacked_Avtar;
