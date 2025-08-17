import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getVehiclesByParams } from "../api/personsApi";

const useFetchVehicles = () => {
  const [certNumberInput, setCertNumberInput] = useState("");
  const [certificatesSearchParams, setCertificatesSearchParams] = useState({});

  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !certNumberInput) return;

    setCertificatesSearchParams({ q: q ?? certNumberInput, searchBase });
  };

  const { isFetching, isLoading, isError, error, data } = useQuery(
    [
      "vehicle-search",
      certificatesSearchParams?.q,
      certificatesSearchParams?.searchBase,
    ],
    () =>
      getVehiclesByParams(
        certificatesSearchParams?.q,
        certificatesSearchParams?.searchBase
      ),
    {
      keepPreviousData: true,
      enabled: !!certificatesSearchParams?.q,
    }
  );

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
  };
};

export default useFetchVehicles;
