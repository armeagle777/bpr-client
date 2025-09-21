import { useQuery } from "@tanstack/react-query";

import { getPoliceByPnum } from "../api/personsApi";

const useFetchPolice = (pnum) => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["police", pnum],
    () => getPoliceByPnum(pnum),
    {
      keepPreviousData: true,
    }
  );

  return {
    error,
    isError,
    isFetching,
    isLoading,
    data,
  };
};

export default useFetchPolice;
