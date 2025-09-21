import { useQuery } from "@tanstack/react-query";
import { getMojCesData } from "../api/personsApi";

const useFetchMojCesData = ({ ...params }) => {
  const { data, isFetching, isError, error } = useQuery(
    ["moj-ces", params],
    () => getMojCesData(params),
    {
      keepPreviousData: false,
      cacheTime: 0,
      enabled: !!params?.psn || !!params?.tax_id,
    }
  );

  return { data, isFetching, isError, error };
};

export default useFetchMojCesData;
