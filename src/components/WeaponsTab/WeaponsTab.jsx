import { Grid, Alert as MuiAlert, Stack } from "@mui/material";

import useFetchWeaponsData from "../../hooks/useFetchWeaponsData";
import ListScileton from "../listSceleton/ListScileton";

import DocumentNotFound from "../family/DocumentNotFound";

const WeaponsTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchWeaponsData({
    ssn: pnum,
  });
  console.log("data>>>>", data);
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

  return (
    <Stack direction="column" gap={4}>
      {!data?.length && (
        <DocumentNotFound notification="Տվյալ անձի վերաբերյալ զենքերի բազայում տվյալներ չեն հայտնաբերվել:" />
      )}
      {/* <Grid container>{showLicense && <LicenseCard license={license} />}</Grid>
       <Grid container spacing={2}>
         {showVehicleCards &&
           vehicles?.map((vehicleInfo, index) => (
             <VehicleCard key={index} car={vehicleInfo} />
           ))}
       </Grid> */}
    </Stack>
  );
};

export default WeaponsTab;
