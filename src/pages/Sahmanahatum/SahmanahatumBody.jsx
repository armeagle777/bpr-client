import { Stack } from "@mui/material";
import BordercrossTable from "../../components/BordercrossTable/BordercrossTable";
import PermitsTable from "../../components/PermitsTable/PermitsTable";

const SahmanahatumBody = ({ data }) => {
  if (!data) return null;
  const { crossingList, residencePermitList } = data;
  return (
    <Stack direction="column" spacing={2}>
      {!!crossingList?.length && (
        <BordercrossTable title="Սահմանահատումներ" data={data.crossingList} />
      )}
      {residencePermitList && (
        <PermitsTable data={residencePermitList} title="Կացության քարտեր" />
      )}
    </Stack>
  );
};

export default SahmanahatumBody;
