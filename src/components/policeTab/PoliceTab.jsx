import { Stack, Alert as MuiAlert } from "@mui/material";

import useFetchPolice from "../../hooks/useFetchPolice";
import ListScileton from "../listSceleton/ListScileton";
import PoliceNotFound from "./PoliceNotFound";

const PoliceTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchPolice(pnum);

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
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.length === 0 ? (
        <PoliceNotFound />
      ) : (
        <MuiAlert variant="outlined" severity="info">
          {data}
        </MuiAlert>
      )}
    </Stack>
  );
};

export default PoliceTab;
