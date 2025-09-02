import { Box } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import useFetchTax from "../../hooks/useFetchTax";
import TaxNotFound from "./components/TaxNotFound";
import FinanceTable from "./components/FinanceTable";
import FinanceCard from "./components/FinanceCard";
import TableScileton from "../tableScileton/TableScileton";
import PageHeaderControls from "./components/PageHeaderControls";
import { pageViewsMap } from "./Finances.constants";

const Finances = ({ ssn }) => {
  const [view, setView] = useState(pageViewsMap.TABLE);
  const {
    data: taxInfo,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchTax(ssn, "bpr");

  const handleChangeView = (e, newValue) => {
    if (!pageViewsMap[newValue]) return;
    setView(pageViewsMap[newValue]);
  };

  if (isFetching) {
    return <TableScileton />;
  }

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <PageHeaderControls onChangeView={handleChangeView} />

      {!taxInfo.length ? (
        <TaxNotFound />
      ) : (
        taxInfo.map((employer) =>
          view === pageViewsMap.TABLE ? (
            <FinanceTable key={employer.taxpayerid} employer={employer} />
          ) : (
            <FinanceCard key={employer.taxpayerid} employer={employer} />
          )
        )
      )}
    </Box>
  );
};

export default Finances;
