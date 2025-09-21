import { Stack, Alert as MuiAlert } from "@mui/material";

import NoResults from "../NoResults/NoResults";
import ListScileton from "../listSceleton/ListScileton";
import useFetchMojCivilCases from "../../hooks/useFetchMojCivilCases";
import CaseCard from "./components/CaseCard";

const MojCivilCasesTab = ({ psn }) => {
  const { data, isFetching, isError, error } = useFetchMojCivilCases(psn);

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
          {data?.map((caseItem, index) => (
            <CaseCard key={index} caseItem={caseItem} />
          ))}
        </MuiAlert>
      )}
    </Stack>
  );
};

export default MojCivilCasesTab;
