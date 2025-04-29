import React from 'react'
import { CiBellOn } from 'react-icons/ci';

const Heading_page = () => {
  return (
      <div className="w-full flex md:flex-row flex-col md:items-center md:justify-between">
           <div className=''>
             <p className="text-[1.5rem] font-[500]">Hi, Akash Biswas</p>
             <p className="text-gray-600 text-lg">Let's finish your task today!</p>
           </div>

           <div className="md:flex gap-5 items-center justify-center hidden">
             <div className="relative cursor-pointer">
               <CiBellOn className="text-[1.7rem]" />
               <div className="absolute bg-red-600 p-1 top-0 right-1 rounded-full"></div>
             </div>
             <div className="overflow-hidden rounded-full bg-gray w-[2.5rem] h-[2.5rem] cursor-pointer">
               <img
                 src={
                   "https://res.cloudinary.com/dekfjauox/image/upload/v1744566405/Qubiko_User/dpm1rfllfyzyuwekz9sx.jpg"
                 }
                 alt=" profile logo"
                 className="w-full"
               />
             </div>
           </div>
         </div>
  )
}

export default Heading_page