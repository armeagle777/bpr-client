import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getWeaponsData } from "../api/personsApi";
import { SEARCH_BASES } from "../pages/WeaponSearch/WeaponSearch.constants";

const useSearchWeapons = () => {
  const [searchInput, setSearchInput] = useState("");
  const [weaponsSearchParams, setWeaponsSearchParams] = useState({});
  const [searchBase, setSearchBase] = useState("SSN");

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
      setWeaponsSearchParams({ searchBase: SEARCH_BASES[newBase], q: "" });
    }
  };
  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !searchInput) return;
    setWeaponsSearchParams({ q: q ?? searchInput, searchBase });
  };

  const { isFetching, isLoading, isError, error, data } = useQuery(
    ["weapons-search", weaponsSearchParams?.q, weaponsSearchParams?.searchBase],
    () =>
      getWeaponsData({
        [weaponsSearchParams?.searchBase]: weaponsSearchParams?.q,
      }),
    {
      keepPreviousData: false,
      enabled: !!weaponsSearchParams?.q,
    }
  );

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    searchBase,
    searchInput,
    setSearchInput,
    handleBaseChange,
    handleSubmitSearch,
  };
};

export default useSearchWeapons;
