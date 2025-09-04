import { useQuery } from "@tanstack/react-query";

import { getCompanyEmployees } from "../api/personsApi";

const useFetchCompanyEmployees = ({ taxId, isTabActive }) => {
  const { isLoading, isFetching, isError, error, data } = useQuery(
    ["company-employees", taxId],
    () => getCompanyEmployees(taxId),
    {
      keepPreviousData: true,
      enabled: !!taxId && isTabActive,
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

export default useFetchCompanyEmployees;
