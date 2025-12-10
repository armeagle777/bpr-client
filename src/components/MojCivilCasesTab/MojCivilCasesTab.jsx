import { useMemo } from 'react';
import { Stack, Alert as MuiAlert, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import NoResults from '../NoResults/NoResults';
import ListScileton from '../listSceleton/ListScileton';
import useFetchMojCivilCases from '../../hooks/useFetchMojCivilCases';
import CaseCard from './components/CaseCard';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import MojCivilCasesReport from '../pdf-templates/MojCivilCasesReport';

const MojCivilCasesTab = ({ psn }) => {
  const { data, isFetching, isError, error } = useFetchMojCivilCases(psn);
  const user = useAuthUser();

  const cases = Array.isArray(data) ? data : [];
  const hasCases = cases.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safePsn = typeof psn === 'string' ? psn.replace(/[^\w-]/g, '_') : 'report';
    return `moj_civil_cases_${safePsn || 'report'}.pdf`;
  }, [psn]);

  const exportButton = hasCases ? (
    <PDFGenerator
      PDFTemplate={MojCivilCasesReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ psn, cases }}
      userFullName={userFullName}
    />
  ) : null;

  if (isFetching) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  if (!cases.length) {
    return <NoResults />;
  }

  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="primary" fontWeight="bold">
          Քաղաքացիական գործեր
        </Typography>
        {exportButton}
      </Stack>
      <MuiAlert variant="outlined" severity="info">
        {cases.map((caseItem, index) => (
          <CaseCard key={index} caseItem={caseItem} />
        ))}
      </MuiAlert>
    </Stack>
  );
};

export default MojCivilCasesTab;
