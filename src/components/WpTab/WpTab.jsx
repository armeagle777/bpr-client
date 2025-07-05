import { Stack, Alert as MuiAlert, Typography } from "@mui/material";

import ListScileton from "../listSceleton/ListScileton";
import NotFound from "./NotFound";
import useFetchWpData from "../../hooks/useFetchWpData";
import CertificatesTable from "./CertificatesTable/CertificatesTable";
import WpCaseList from "./WpCaseList/WpCaseList";
import EatmCaseList from "./EatmCaseList/EatmCaseList";
import EatmFamilyCaseList from "./EatmFamilyCaseList/EatmFamilyCaseList";

const WpTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchWpData(pnum);
  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }

  const { wpData, eatmData, eatmFamilyData, cards } = data;

  if (
    !wpData?.length &&
    !eatmData?.length &&
    !eatmFamilyData?.length &&
    !cards?.length
  ) {
    return <NotFound />;
  }
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {!!cards?.length && <CertificatesTable cards={cards} />}

      {(!!wpData?.length || !!eatmData?.length || !!eatmFamilyData?.length) && (
        <Stack spacing={1}>
          <Typography variant="body2" component="span">
            Դիմումների պատմություն
          </Typography>
          {!!wpData?.length && <WpCaseList data={wpData} />}
          {!!eatmData?.length && <EatmCaseList data={eatmData} />}
          {!!eatmFamilyData?.length && (
            <EatmFamilyCaseList data={eatmFamilyData} />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default WpTab;
