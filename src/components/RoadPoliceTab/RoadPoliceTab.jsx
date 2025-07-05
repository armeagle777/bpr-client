import { Grid, Alert as MuiAlert, Stack } from "@mui/material";

import useFetchRoadpoliceData from "../../hooks/useFetchRoadpoliceData";
import ListScileton from "../listSceleton/ListScileton";
import LicenseCard from "../LicenseCard/LicenseCard";
import VehicleCard from "../VehicleCard/VehicleCard";
import DocumentNotFound from "../family/DocumentNotFound";

const RoadPoliceTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchRoadpoliceData(pnum);

  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }

  const { license, vehicles } = data;
  const showLicense = license && !!Object.keys(license)?.length;
  const showVehicleCards = !!vehicles?.length;

  return (
    <Stack direction="column" gap={4}>
      {!showLicense && !showVehicleCards && (
        <DocumentNotFound notification="Տվյալ անձի վերաբերյալ ՃՈ տվյալներ չեն հայտնաբերվել:" />
      )}
      <Grid container>{showLicense && <LicenseCard license={license} />}</Grid>
      <Grid container spacing={2}>
        {showVehicleCards &&
          vehicles?.map((vehicleInfo, index) => (
            <VehicleCard key={index} car={vehicleInfo} />
          ))}
      </Grid>
    </Stack>
  );
};

export default RoadPoliceTab;
