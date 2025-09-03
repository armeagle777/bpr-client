import { useState } from "react";
import { Box } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import NoResults from "../NoResults/NoResults";
import FinanceCard from "./components/FinanceCard";
import { pageViewsMap } from "./Finances.constants";
import FinanceTable from "./components/FinanceTable";
import TableScileton from "../tableScileton/TableScileton";
import PageHeaderControls from "./components/PageHeaderControls";
import useFetchPersonIncomes from "../../hooks/useFetchPersonIncomes";

const Finances = ({ ssn }) => {
  const [view, setView] = useState(pageViewsMap.TABLE);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: taxInfo,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchPersonIncomes(ssn, "bpr");

  const handleChangeView = (e, newValue) => {
    setView(newValue);
  };

  const handleDateChange = (newDate) => {};

  if (isFetching || isLoading) {
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
      <PageHeaderControls
        view={view}
        startDate={startDate}
        endDate={endDate}
        onChangeView={handleChangeView}
        onDateChange={handleDateChange}
      />

      {!taxInfo?.length ? (
        <NoResults />
      ) : (
        taxInfo.map((employer, index) =>
          view === pageViewsMap.TABLE ? (
            <FinanceTable key={index} employer={employer} />
          ) : (
            <FinanceCard key={index} employer={employer} />
          )
        )
      )}
    </Box>
  );
};

export default Finances;
