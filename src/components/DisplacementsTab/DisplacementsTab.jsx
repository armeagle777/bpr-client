import { Stack, Alert as MuiAlert, Typography, Box } from "@mui/material";

import ListScileton from "../listSceleton/ListScileton";
import NotFound from "./NotFound";
import useFetchArtsakh from "../../hooks/useFetchArtsakh";
import CertificatesTable from "./CertificatesTable/CertificatesTable";
import DisplacementDoc from "./DisplacementDoc";

const DisplacementsTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchArtsakh(pnum);

  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }

  if (!data?.cases?.length && !data.certificates?.length) {
    return <NotFound />;
  }

  return (
    <Stack spacing={4} flexDirection="column" sx={{ py: 3, px: 1 }}>
      <Stack spacing={1}>
        <Typography variant="body2" component="span">
          Վկայականներ
        </Typography>
        {!!data?.certificates?.length && (
          <CertificatesTable cases={data.certificates} />
        )}
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2" component="span">
          Տեղահանությունների պատմություն
        </Typography>
        {!!data?.cases?.length &&
          data.cases.map((doc, index) => (
            <DisplacementDoc key={index} caseInfo={doc} />
          ))}
      </Stack>
    </Stack>
  );
};

export default DisplacementsTab;
