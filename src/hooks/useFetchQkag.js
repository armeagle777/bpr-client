import { useQuery } from "@tanstack/react-query";

import { getQkagDocsBySsn } from "../api/personsApi";

const useFetchQkag = (ssn, firstName, lastName) => {
  const { isLoading, isError, error, data } = useQuery(
    ["qkag-documents", ssn, firstName, lastName],
    () => getQkagDocsBySsn(ssn, firstName, lastName),
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

export default useFetchQkag;
