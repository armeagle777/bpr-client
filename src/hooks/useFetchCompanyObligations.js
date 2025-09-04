import { useQuery } from "@tanstack/react-query";

import { getCompanyObligations } from "../api/personsApi";

const useFetchCompanyObligations = ({ tin, isTabActive }) => {
  const { isLoading, isFetching, isError, error, data } = useQuery(
    ["company-obligations", tin],
    () => getCompanyObligations(tin),
    {
      keepPreviousData: true,
      enabled: !!tin && isTabActive,
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

export default useFetchCompanyObligations;
