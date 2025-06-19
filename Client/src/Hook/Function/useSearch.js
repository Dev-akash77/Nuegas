import React, { useEffect, useMemo, useState } from "react";

const useSearch = (data = [], searchItem = "", key = "name", delay = 300) => {
  const [debounce, setdebounce] = useState(searchItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounce(searchItem);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchItem, delay]);
  
  const filterData = useMemo(() => {
   return data?.filter((cur) => {
      if (!debounce.trim()) {
        return data;
      }

      return cur[key].toLowerCase().includes(debounce.toLowerCase());
    });
  }, [debounce, data, key]);

  
  return filterData;
};

export default useSearch;
