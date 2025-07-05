import { useQuery } from "@tanstack/react-query";

import { getPropertiesBySsn } from "../api/personsApi";

const useFetchKadastr = (ssn) => {
  const { isLoading, isError, error, data } = useQuery(
    ["kadastr-properties", ssn],
    () => getPropertiesBySsn(ssn),
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

export default useFetchKadastr;
