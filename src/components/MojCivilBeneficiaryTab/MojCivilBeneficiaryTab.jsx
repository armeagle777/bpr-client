import { useMemo } from 'react';
import { Stack, Alert as MuiAlert, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import NoResults from '../NoResults/NoResults';
import ListScileton from '../listSceleton/ListScileton';
import useFetchCivilBeneficiaryData from '../../hooks/useFetchCivilBeneficiaryData';
import BeneficiaryCard from './components/BeneficiaryCard';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import MojCivilBeneficiaryReport from '../pdf-templates/MojCivilBeneficiaryReport';

const MojCivilBeneficiaryTab = ({ psn }) => {
  const { data, isFetching, isError, error } = useFetchCivilBeneficiaryData(psn);
  const user = useAuthUser();

  const beneficiaries = Array.isArray(data) ? data : [];
  const hasData = beneficiaries.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safePsn = typeof psn === 'string' ? psn.replace(/[^\w-]/g, '_') : 'report';
    return `moj_civil_beneficiary_${safePsn || 'report'}.pdf`;
  }, [psn]);

  const exportButton = hasData ? (
    <PDFGenerator
      PDFTemplate={MojCivilBeneficiaryReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ psn, beneficiaries }}
      userFullName={userFullName}
    />
  ) : null;

  if (isFetching) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  if (!beneficiaries.length) return <NoResults />;
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="primary" fontWeight="bold">
          Շահառուի տվյալներ
        </Typography>
        {exportButton}
      </Stack>
      <MuiAlert variant="outlined" severity="info">
        {beneficiaries?.map((caseItem, index) => (
          <BeneficiaryCard key={index} data={caseItem} />
        ))}
      </MuiAlert>
    </Stack>
  );
};

export default MojCivilBeneficiaryTab;
