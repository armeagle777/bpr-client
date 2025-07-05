import { Stack } from "@mui/material";

import EatmFamilyCard from "./EatmFamilyCard";

const EatmFamilyCaseList = ({ data }) => {
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.map((claim, index) => {
        return <EatmFamilyCard key={index} claim={claim} />;
      })}
    </Stack>
  );
};

export default EatmFamilyCaseList;
