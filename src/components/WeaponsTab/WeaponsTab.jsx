import { Alert as MuiAlert, Typography } from "@mui/material";

import useFetchWeaponsData from "../../hooks/useFetchWeaponsData.js";
import ListScileton from "../listSceleton/ListScileton";
import WeaponsTable from "../WeaponsTable/WeaponsTable";

import NoResults from "../NoResults/NoResults.jsx";

const WeaponsTab = ({ ssn, tax_id }) => {
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchWeaponsData({
    ssn,
    tax_id,
  });

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2 }}
      >
        Հաշվառված Զենքերի Վերաբերյալ Տեղեկատվություն
      </Typography>
      {isFetching ? (
        <ListScileton />
      ) : !data?.length ? (
        <NoResults />
      ) : (
        <WeaponsTable data={data} isFetching={isFetching} />
      )}
    </>
  );
};

export default WeaponsTab;
