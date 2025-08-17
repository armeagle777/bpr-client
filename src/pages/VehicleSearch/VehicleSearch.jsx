import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { Header, Body } from "./components";
import { SEARCH_BASES } from "./VehicleSearch.constants";
import useFetchVehicles from "../../hooks/useFetchVehicles";

const VehicleSearch = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const search_base = searchParams.get("search_base");

  const [searchBase, setSearchBase] = useState(search_base || "PLATE_NUMBER");

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
    }
  };

  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
  } = useFetchVehicles();

  useEffect(() => {
    if (q) {
      handleSubmitSearch(q, SEARCH_BASES[searchBase]);
    }
  }, [q]);

  return (
    <Container>
      <Header
        searchBase={searchBase}
        isFetching={isFetching}
        certNumberInput={certNumberInput}
        handleBaseChange={handleBaseChange}
        setCertNumberInput={setCertNumberInput}
        handleSubmitSearch={handleSubmitSearch}
      />
      <Body
        data={data}
        error={error}
        isError={isError}
        isFetching={isFetching}
      />
    </Container>
  );
};

export default VehicleSearch;
