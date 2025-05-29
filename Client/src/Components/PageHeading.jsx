import React from 'react'
import { useGlobalContext } from '../Context/GlobalContext';
import { Link } from 'react-router-dom';
import { CiBellOn } from 'react-icons/ci';

const PageHeading = ({text}) => {
    const { profileData } =useGlobalContext();
  return (
      <div className="w-full flex md:flex-row flex-col md:items-center md:justify-between">
           <div className=''>
             <p className="text-[1.5rem] font-[500]">{text}</p>
           </div>

           <div className="md:flex gap-5 items-center justify-center hidden">
             <div className="relative cursor-pointer">
               <CiBellOn className="text-[1.7rem]" />
               <div className="absolute bg-red-600 w-4 h-4 text-white cc text-[.7rem] -top-1 right-0 rounded-full">1</div>
             </div>
             <Link to={"profile"} className="overflow-hidden rounded-full bg-gray w-[2.5rem] h-[2.5rem] cursor-pointer">
               <img
                 src={
                  profileData?.profile?.image
                 }
                 alt=" profile logo"
                 className="w-full"
               />
             </Link>
           </div>
         </div>
  )
}


export default PageHeading