import { useQuery } from "@tanstack/react-query";

import { getCompanyByHvhh } from "../api/personsApi";

const useFetchCompany = (tax_id, shouldFetchCompanyData) => {
  const { isFetching, isError, error, data, isLoading } = useQuery(
    ["company", tax_id],
    () => getCompanyByHvhh(tax_id),
    {
      keepPreviousData: true,
      enabled: !!tax_id && shouldFetchCompanyData,
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

export default useFetchCompany;
