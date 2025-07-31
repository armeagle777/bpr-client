import MuiAlert from "@mui/material/Alert";

import PropertyInfo from "./PropertyInfo";
import { useVehicleSearch } from "../../../components/context/vehicleSearch";
import VehicleCard from "../../../components/VehicleCard/VehicleCard";
import { Grid } from "@mui/material";

const Body = () => {
  const { data, isLoading, isFetching, isError, error } = useVehicleSearch();

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
