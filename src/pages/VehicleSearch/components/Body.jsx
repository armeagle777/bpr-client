import { Grid, Alert as MuiAlert } from "@mui/material";

import VehicleCard from "../../../components/VehicleCard/VehicleCard";

const Body = ({ data, isFetching, isError, error }) => {
  if (isFetching) {
    return "Loading...";
  }

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }
  return (
    <Grid container spacing={2}>
      {!!data?.vehicles &&
        data.vehicles.map((vehicle, index) => (
          <VehicleCard key={index} car={vehicle} />
        ))}
    </Grid>
  );
};

export default Body;
