import { Alert as MuiAlert } from "@mui/material";
import BordercrossTable from "../BordercrossTable/BordercrossTable";

import useFetchBordercrossData from "../../hooks/useFetchBordercrossData";
import ListScileton from "../listSceleton/ListScileton";
import PermitsTable from "../PermitsTable/PermitsTable";

const BordercrossTab = ({ documents }) => {
  const { data, isLoading, isError, error } =
    useFetchBordercrossData(documents);

  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }
  const { crossingList, residencePermitList } = data;
  return (
    <div>
      {crossingList && (
        <BordercrossTable data={crossingList} title="Սահմանահատումներ" />
      )}
      {residencePermitList && (
        <PermitsTable data={residencePermitList} title="Կացության քարտեր" />
      )}
    </div>
  );
};

export default BordercrossTab;
