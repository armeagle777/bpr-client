import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCompanyForPersonByHvhh } from "../api/personsApi";

const useFetchBusiness = () => {
  const [taxIdInputValue, setTaxIdInputValue] = useState("");
  const [companySearchParams, setCompanySearchParams] = useState(null);

  const { isFetching, isError, error, data } = useQuery(
    ["business", companySearchParams],
    () => getCompanyForPersonByHvhh(companySearchParams),
    {
      keepPreviousData: true,
      enabled: !!companySearchParams,
    }
  );

  const handleSubmitSearch = (taxId) => {
    if (!taxId && !taxIdInputValue) return;
    setCompanySearchParams(taxId ? taxId : taxIdInputValue);
  };

  return {
    data,
    error,
    isError,
    isFetching,
    taxIdInputValue,
    setTaxIdInputValue,
    handleSubmitSearch,
  };
};

export default useFetchBusiness;
