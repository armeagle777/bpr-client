import { Grid, Alert as MuiAlert } from "@mui/material";

import VehicleCard from "../../../components/VehicleCard/VehicleCard";
import DataLoader from "../../../components/DataLoader/DataLoader";
import DrivingLicenseCard from "./DrivingLicenseCard";

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
      {!!data?.licenses &&
        data.licenses.map((license, index) => (
          <DrivingLicenseCard key={index} data={license} />
        ))}
    </Grid>
  );
};

export default Body;
