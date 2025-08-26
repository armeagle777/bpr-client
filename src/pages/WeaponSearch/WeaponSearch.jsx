import { memo, useEffect, useState } from "react";
import { Container } from "@mui/material";

import WeaponsSearchHeader from "./components/WeaponsSearchHeader";
import WeaponsTable from "../../components/WeaponsTable/WeaponsTable";
import useSearchWeapons from "../../hooks/useSearchWeapons";
import { useSearchParams } from "react-router-dom";
import { SEARCH_BASES } from "./WeaponSearch.constants";

const WeaponSearch = () => {
  const [searchParams] = useSearchParams();
  const search_base = searchParams.get("search_base");

  const [searchBase, setSearchBase] = useState(search_base || "SSN");

  const q = searchParams.get("q");
  useEffect(() => {
    if (q) {
      handleSubmitSearch(q, SEARCH_BASES[searchBase]);
    }
  }, [q]);

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
    }
  };
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
  } = useSearchWeapons();

  return (
    <Container>
      <WeaponsSearchHeader
        searchBase={searchBase}
        isFetching={isFetching}
        certNumberInput={certNumberInput}
        handleBaseChange={handleBaseChange}
        setCertNumberInput={setCertNumberInput}
        handleSubmitSearch={handleSubmitSearch}
      />
      <WeaponsTable isFetching={isFetching} data={weapons} />
    </Container>
  );
};

export default memo(WeaponSearch);
