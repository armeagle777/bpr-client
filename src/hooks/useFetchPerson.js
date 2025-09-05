import { useQuery } from "@tanstack/react-query";

import { getPersonBySsn } from "../api/personsApi";

const useFetchPerson = (ssn, enabled = true) => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["persons", ssn],
    () => getPersonBySsn(ssn),
    {
      keepPreviousData: false,
      enabled,
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

export default useFetchPerson;
