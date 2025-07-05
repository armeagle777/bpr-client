import { Stack } from "@mui/material";
import EatmClaimCard from "./EatmClaimCard";

const EatmCaseList = ({ data }) => {
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.map((claim, index) => {
        return <EatmClaimCard key={index} claim={claim} />;
      })}
    </Stack>
  );
};

export default EatmCaseList;
