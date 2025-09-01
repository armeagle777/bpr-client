import { useQuery } from "@tanstack/react-query";
import { getMojCesData } from "../api/personsApi";

const useFetchMojCesData = ({ isTabActive = true, ...params }) => {
  const { data, isFetching, isError, error } = useQuery(
    ["moj-ces", params],
    () => getMojCesData(params),
    {
      keepPreviousData: false,
      cacheTime: 0,
      enabled: (!!params?.psn || !!params?.tax_id) && isTabActive !== false,
    }
  );

  return { data, isFetching, isError, error };
};

export default useFetchMojCesData;
