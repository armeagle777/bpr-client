import { useQuery } from "@tanstack/react-query";

import { getWeaponsData } from "../api/personsApi";

const useFetchWeaponsData = (params) => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["weapons", params],
    () => getWeaponsData(params),
    {
      keepPreviousData: false,
      cacheTime: 0,
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
