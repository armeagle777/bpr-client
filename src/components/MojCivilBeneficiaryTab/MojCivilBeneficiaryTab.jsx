import { Stack, Alert as MuiAlert } from "@mui/material";

import NoResults from "../NoResults/NoResults";
import ListScileton from "../listSceleton/ListScileton";
import useFetchCivilBeneficiaryData from "../../hooks/useFetchCivilBeneficiaryData";
import BeneficiaryCard from "./components/BeneficiaryCard";

const MojCivilBeneficiaryTab = ({ psn }) => {
  const { data, isFetching, isError, error } =
    useFetchCivilBeneficiaryData(psn);
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
  if (!data) return null;
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.length === 0 ? (
        <NoResults />
      ) : (
        <MuiAlert variant="outlined" severity="info">
          {data &&
            data?.map((caseItem, index) => (
              <BeneficiaryCard key={index} data={caseItem} />
            ))}
        </MuiAlert>
      )}
    </Stack>
  );
};

export default MojCivilBeneficiaryTab;
