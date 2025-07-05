import { createContext, useContext, useState } from "react";

import useFetchKadastrCertificates from "../../hooks/useFetchKadastrCertificates";
import { useSearchParams } from "react-router-dom";

const KadastrCertContext = createContext(null);

export const KadastrCertsProvider = ({ children }) => {
  const [certNumberInput, setCertNumberInput] = useState("");
  const [certificatesSearchParams, setCertificatesSearchParams] = useState({});

  const { data, isLoading, isFetching, isError, error } =
    useFetchKadastrCertificates(certificatesSearchParams);

  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !certNumberInput) return;

    setCertificatesSearchParams({ q: q ?? certNumberInput, searchBase });
  };

  return (
    <KadastrCertContext.Provider
      value={{
        data,
        isLoading,
        isFetching,
        isError,
        error,
        certNumberInput,
        setCertNumberInput,
        handleSubmitSearch,
      }}
    >
      {children}
    </KadastrCertContext.Provider>
  );
};

export const useKadastrCerts = () => useContext(KadastrCertContext);
