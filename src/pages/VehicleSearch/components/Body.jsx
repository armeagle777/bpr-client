import { Grid, Alert as MuiAlert } from "@mui/material";

import VehicleCard from "../../../components/VehicleCard/VehicleCard";
import DataLoader from "../../../components/DataLoader/DataLoader";

const Body = ({ data, isFetching, isError, error }) => {
  if (isFetching) {
    return <DataLoader />;
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
