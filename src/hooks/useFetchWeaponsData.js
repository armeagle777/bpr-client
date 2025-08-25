import { useQuery } from "@tanstack/react-query";

import { getWeaponsData } from "../api/personsApi";

const useFetchWeaponsData = (params) => {
  const { isLoading, isError, error, data } = useQuery(
    ["weapons", pnum],
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
    data,
  };
};

export default useFetchWeaponsData;
