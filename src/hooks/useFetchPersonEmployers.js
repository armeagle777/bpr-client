import { useQuery } from "@tanstack/react-query";

import { getPersonEmployers } from "../api/personsApi";

const useFetchPersonEmployers = (ssn) => {
  const { isLoading, isFetching, isError, error, data } = useQuery(
    ["person-employers", ssn],
    () => getPersonEmployers(ssn),
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
  };
};

export default useFetchPersonEmployers;
