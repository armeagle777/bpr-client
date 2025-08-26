import { memo } from "react";
import { Container } from "@mui/material";

import WeaponsSearchHeader from "./components/WeaponsSearchHeader";
import WeaponsTable from "../../components/WeaponsTable/WeaponsTable";
import useSearchWeapons from "../../hooks/useSearchWeapons";
import DataLoader from "../../components/DataLoader/DataLoader";

const WeaponSearch = () => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    searchBase,
    searchInput,
    setSearchInput,
    handleSubmitSearch,
    handleBaseChange,
  } = useSearchWeapons();
  return (
    <Container>
      <WeaponsSearchHeader
        searchBase={searchBase}
        isFetching={isFetching}
        searchInput={searchInput}
        handleBaseChange={handleBaseChange}
        setSearchInput={setSearchInput}
        handleSubmitSearch={handleSubmitSearch}
      />
      {isFetching && <DataLoader />}

      {Array.isArray(data) && (
        <WeaponsTable isFetching={isFetching} data={data} fullWidth={true} />
      )}
    </Container>
  );
};

export default memo(WeaponSearch);
