import { useQuery } from "@tanstack/react-query";

import { getDisplacementsBySsn } from "../api/personsApi";

const useFetchArtsakh = (ssn) => {
  const { isLoading, isError, error, data } = useQuery(
    ["artsakh-displacements", ssn],
    () => getDisplacementsBySsn(ssn),
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

export default useFetchArtsakh;
