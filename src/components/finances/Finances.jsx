import { useMemo, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import NoResults from '../NoResults/NoResults';
import FinanceCard from './components/FinanceCard';
import { pageViewsMap } from './Finances.constants';
import FinanceTable from './components/FinanceTable';
import TableScileton from '../tableScileton/TableScileton';
import PageHeaderControls from './components/PageHeaderControls';
import useFetchPersonIncomes from '../../hooks/useFetchPersonIncomes';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import FinancesReport from '../pdf-templates/FinancesReport';

const Finances = ({ ssn }) => {
  const [view, setView] = useState(pageViewsMap.TABLE);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const user = useAuthUser();

  const {
    data: taxInfo,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchPersonIncomes(ssn, 'bpr');

  const handleChangeView = (e, newValue) => {
    setView(newValue);
  };

  const handleDateChange = (newDate) => {};

  const hasResults = Boolean(taxInfo?.length);
  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safeSsn = typeof ssn === 'string' ? ssn.replace(/[^\w-]/g, '_') : 'report';
    return `finances_${safeSsn || 'report'}.pdf`;
  }, [ssn]);

  const exportButton = hasResults ? (
    <PDFGenerator
      PDFTemplate={FinancesReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ PNum: ssn, employers: taxInfo }}
      userFullName={userFullName}
    />
  ) : null;

  if (isFetching || isLoading) {
    return <TableScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <PageHeaderControls
        view={view}
        startDate={startDate}
        endDate={endDate}
        onChangeView={handleChangeView}
        onDateChange={handleDateChange}
        actions={exportButton}
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
