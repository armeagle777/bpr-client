import { useQuery } from "@tanstack/react-query";

import { getWpDataBySsn } from "../api/personsApi";

const useFetchWpData = (ssn) => {
  const { isLoading, isError, error, data } = useQuery(
    ["wp-data", ssn],
    () => getWpDataBySsn(ssn),
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

export default useFetchWpData;
