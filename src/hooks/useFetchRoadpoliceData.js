import { useQuery } from "@tanstack/react-query";

import { getRoadpoliceDataBySsn } from "../api/personsApi";

const useFetchRoadpoliceData = (pnum) => {
  const { isLoading, isError, error, data } = useQuery(
    ["roadpolice-data", pnum],
    () => getRoadpoliceDataBySsn(pnum),
    {
      keepPreviousData: true,
    }
  );

  return {
    error,
    isError,
    isLoading,
    data,
  };
};

export default useFetchRoadpoliceData;
