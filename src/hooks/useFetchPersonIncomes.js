import { useQuery } from "@tanstack/react-query";

import { getPersonIncomes } from "../api/personsApi";

const useFetchPersonIncomes = (ssn, page) => {
  const { isLoading, isFetching, isError, error, data } = useQuery(
    ["person-incomes", page, ssn],
    () => getPersonIncomes(ssn),
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

export default useFetchPersonIncomes;
