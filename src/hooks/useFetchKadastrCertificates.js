import { useQuery } from "@tanstack/react-query";

import { getKadastrCertByNumber } from "../api/personsApi";
import { useState } from "react";

const useFetchKadastrCertificates = () => {
  const [certNumberInput, setCertNumberInput] = useState("");
  const [certificatesSearchParams, setCertificatesSearchParams] = useState({});

  const { isFetching, isLoading, isError, error, data } = useQuery(
    [
      "kadastr-certificates",
      certificatesSearchParams?.q,
      certificatesSearchParams?.searchBase,
    ],
    () =>
      getKadastrCertByNumber(
        certificatesSearchParams?.q,
        certificatesSearchParams?.searchBase
      ),
    {
      keepPreviousData: true,
      enabled: !!certificatesSearchParams?.q,
    }
  );

  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !certNumberInput) return;

    setCertificatesSearchParams({ q: q ?? certNumberInput, searchBase });
  };

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    certNumberInput,
    handleSubmitSearch,
    setCertNumberInput,
  };
};

export default useFetchKadastrCertificates;
