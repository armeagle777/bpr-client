import { useQuery } from "@tanstack/react-query";

import { getWeaponsData } from "../api/personsApi";

const useFetchWeaponsData = (params) => {
  const { isTabActive = true, ...filterParams } = params;
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["weapons", filterParams],
    () => getWeaponsData(filterParams),
    {
      keepPreviousData: false,
      cacheTime: 0,
      enabled: isTabActive,
    }
  );

  return {
    error,
    isError,
    isLoading,
    isFetching,
    data,
  };
};

export default useFetchWeaponsData;
