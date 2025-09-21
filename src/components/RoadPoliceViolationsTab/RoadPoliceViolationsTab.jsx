import { useMemo, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Avatar,
  TextField,
  Typography,
  CardHeader,
  CardContent,
  ToggleButton,
  Alert as MuiAlert,
  ToggleButtonGroup,
} from "@mui/material";

import NoResults from "../NoResults/NoResults";
import ListScileton from "../listSceleton/ListScileton";
import { ViolationsCardList, ViolationsTable } from "./components";
import useFetchRoadPoliceViolations from "../../hooks/useFetchRoadPoliceViolations";

const RoadPoliceViolationsTab = ({ pnum }) => {
  const [view, setView] = useState("cards");
  const [query, setQuery] = useState("");

  const { data, error, isError, isFetching } =
    useFetchRoadPoliceViolations(pnum);

  const filteredViolations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((r) => {
      return (
        (r.vehicle_number && r.vehicle_number.toLowerCase().includes(q)) ||
        (r.rp_violator_fullname &&
          r.rp_violator_fullname.toLowerCase().includes(q)) ||
        (r.rp_violation_id && r.rp_violation_id.includes(q))
      );
    });
  }, [data, query]);

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

  return !data?.items?.length ? (
    <NoResults />
  ) : (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%" }}>
        <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "primary.main" }}>Վ</Avatar>}
            title={
              <Typography variant="h6">
                Վարման ընթերցումներ — Կարգավորվող պատերզմներ
              </Typography>
            }
            subheader={
              <Typography variant="caption">{data.length} գրառում</Typography>
            }
          />
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Փնտրել ըստ կոդի, մեքենայի համարի կամ անունի"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                    size="small"
                  >
                    <ToggleButton value="cards">Քարտեր</ToggleButton>
                    <ToggleButton value="table">Սյունակներ</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {view === "table" ? (
          <ViolationsCardList violations={filteredViolations} />
        ) : (
          <ViolationsTable violations={filteredViolations} />
        )}
      </Box>
    </Grid>
  );
};

export default RoadPoliceViolationsTab;
