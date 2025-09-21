import { Box, Grid, Alert as MuiAlert } from "@mui/material";
import { useState } from "react";

import NoResults from "../NoResults/NoResults";
import ListScileton from "../listSceleton/ListScileton";
import useFetchRoadPoliceViolations from "../../hooks/useFetchRoadPoliceViolations";
import {
  PageHeaderControls,
  ViolationsCardList,
  ViolationsTable,
} from "./components";
import { pageViewsMap } from "./RoadPoliceViolationsTab.constants";

const RoadPoliceViolationsTab = ({ pnum }) => {
  const [view, setView] = useState(pageViewsMap.CARD);

  const { data, error, isError, isFetching } =
    useFetchRoadPoliceViolations(pnum);

  const handleViewChange = (e, next) => {
    if (next) setView(next);
  };

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
    <Grid container spacing={2}>
      <Box sx={{ width: "100%" }}>
        <PageHeaderControls view={view} onChangeView={handleViewChange} />
        {view === pageViewsMap.CARD ? (
          <ViolationsCardList violations={data} />
        ) : (
          <ViolationsTable violations={data} />
        )}
      </Box>
    </Grid>
  );
};

export default RoadPoliceViolationsTab;
