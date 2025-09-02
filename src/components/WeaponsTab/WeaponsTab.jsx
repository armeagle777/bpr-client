import { Alert as MuiAlert } from "@mui/material";

import useFetchWeaponsData from "../../hooks/useFetchWeaponsData.js";
import ListScileton from "../listSceleton/ListScileton";
import WeaponsTable from "../WeaponsTable/WeaponsTable";

import NoResults from "../NoResults/NoResults.jsx";
import { WEAPONS_NOT_FOUND_MESSAGE } from "./WeaponsTab.constants.js";

const WeaponsTab = ({ ssn, tax_id, isTabActive = true }) => {
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchWeaponsData({
    ssn,
    tax_id,
    isTabActive,
  });

  if (isFetching) {
    return <ListScileton />;
  }

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  return !data?.length ? (
    <NoResults />
  ) : (
    <WeaponsTable data={data} isFetching={isFetching} />
  );
};

export default WeaponsTab;
