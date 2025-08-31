import { useQuery } from "@tanstack/react-query";

import { getCompanyByHvhh } from "../api/personsApi";

const useFetchCompany = (tax_id) => {
  const { isFetching, isError, error, data, isLoading } = useQuery(
    ["company", tax_id],
    () => getCompanyByHvhh(tax_id),
    {
      keepPreviousData: true,
      enabled: !!tax_id,
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
