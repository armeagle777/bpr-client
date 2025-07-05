import { createContext, useContext, useState } from "react";

import { useSearchParams } from "react-router-dom";
import useFetchVehicles from "../../hooks/useFetchVehicles";

const VehicleSearchContext = createContext(null);

export const VehicleSearchProvider = ({ children }) => {
  const [certNumberInput, setCertNumberInput] = useState("");
  const [certificatesSearchParams, setCertificatesSearchParams] = useState({});

  const { data, isLoading, isFetching, isError, error } = useFetchVehicles(
    certificatesSearchParams
  );

  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !certNumberInput) return;

    setCertificatesSearchParams({ q: q ?? certNumberInput, searchBase });
  };

  return (
    <VehicleSearchContext.Provider
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
    </VehicleSearchContext.Provider>
  );
};

export const useVehicleSearch = () => useContext(VehicleSearchContext);
