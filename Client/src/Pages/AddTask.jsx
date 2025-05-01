import React, { useEffect } from 'react'
import { useGlobalContext } from '../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const { profileData } = useGlobalContext();  
    const navigate = useNavigate();

    useEffect(() => {
      if (profileData?.profile?.role === "employee") {
        navigate("/");
      }
    }, [profileData]);
    


  return (
    <div>AddTask</div>
  )
}

export default AddTask