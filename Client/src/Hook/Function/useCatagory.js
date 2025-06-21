



const useCatagory = (data=[],key="") => {
   if (key==="") {
    return data;
   }   
   const catagoryData = data?.map((cur)=>cur[key]);
   
   return [... new Set(catagoryData)];
}

export default useCatagory