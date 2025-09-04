import { useQuery } from "@tanstack/react-query";

import { getCompanyEmployees } from "../api/personsApi";

const useFetchCompanyEmployees = ({ taxId }) => {
  const { isLoading, isFetching, isError, error, data } = useQuery(
    ["company-employees", taxId],
    () => getCompanyEmployees(taxId),
    {
      keepPreviousData: true,
      enabled: !!taxId,
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
