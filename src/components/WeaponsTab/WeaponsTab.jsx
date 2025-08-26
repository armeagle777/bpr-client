import { Grid, Alert as MuiAlert, Stack } from "@mui/material";

import useFetchWeaponsData from "../../hooks/useFetchWeaponsData.js";
import ListScileton from "../listSceleton/ListScileton";
import WeaponsTable from "../WeaponsTable/WeaponsTable";

import DocumentNotFound from "../family/DocumentNotFound";
import { WEAPONS_NOT_FOUND_MESSAGE } from "./WeaponsTab.constants.js";

const WeaponsTab = ({ pnum }) => {
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchWeaponsData({
    ssn: pnum,
  });

  if (isLoading) {
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
    <DocumentNotFound notification={WEAPONS_NOT_FOUND_MESSAGE} />
  ) : (
    <WeaponsTable data={data} isFetching={isFetching} />
  );
};

export default WeaponsTab;
