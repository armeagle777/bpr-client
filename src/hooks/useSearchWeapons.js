import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getWeaponsData } from "../api/personsApi";

const useSearchWeapons = () => {
  const [searchInput, setSearchInput] = useState("");
  const [weaponsSearchParams, setWeaponsSearchParams] = useState({});

  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !searchInput) return;

    setWeaponsSearchParams({ q: q ?? searchInput, searchBase });
  };

  const { isFetching, isLoading, isError, error, data } = useQuery(
    ["weapons-search", weaponsSearchParams?.q, weaponsSearchParams?.searchBase],
    () =>
      getWeaponsData({
        [weaponsSearchParams?.q]: weaponsSearchParams?.searchBase,
      }),
    {
      keepPreviousData: true,
      enabled: !!weaponsSearchParams?.q,
    }
  );
  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    searchInput,
    setSearchInput,
    handleSubmitSearch,
  };
};

export default useSearchWeapons;
