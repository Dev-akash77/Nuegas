import { useQuery } from "@tanstack/react-query";
import { securityApi } from "../Api/GlobalApi";

const CheckSecurity = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["protect route"],
    queryFn: securityApi,
    enabled: true,
  });

  return { data, isLoading, refetch };
};

export default CheckSecurity;
