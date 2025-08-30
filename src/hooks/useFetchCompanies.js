import { useQuery } from "@tanstack/react-query";

import { getCompaniesBySsn } from "../api/personsApi";

const useFetchCompanies = (ssn) => {
  const { isLoading, isError, error, data } = useQuery(
    ["companies", ssn],
    () => getCompaniesBySsn(ssn),
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

export default useFetchCompanies;
