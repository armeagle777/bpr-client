import { useMemo } from 'react';
import { Box, Alert, Stack, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import NoResults from '../NoResults/NoResults';
import DebtorCard from './components/DebtorCard';
import DataLoader from '../DataLoader/DataLoader';
import useFetchMojCesData from '../../hooks/useFetchMojCesData';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import MojCesDebtorReport from '../pdf-templates/MojCesDebtorReport';

const MojCesDebtorTab = ({ psn, tax_id }) => {
  const { data = [], isError, error, isFetching } = useFetchMojCesData({ psn, tax_id });
  const user = useAuthUser();

  const hasData = data.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const baseId = psn || tax_id;
    const safeId = typeof baseId === 'string' ? baseId.replace(/[^\w-]/g, '_') : 'report';
    return `moj_ces_${safeId || 'report'}.pdf`;
  }, [psn, tax_id]);

  const exportButton = hasData ? (
    <PDFGenerator
      PDFTemplate={MojCesDebtorReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ cases: data, psn, tax_id }}
      userFullName={userFullName}
    />
  ) : null;

  if (isError) {
    return <Alert severity="error">{error?.message || 'Սխալ է տեղի ունեցել:'}</Alert>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          ԴԱՀԿ Գործերի Վերաբերյալ Տեղեկատվություն
        </Typography>
        {exportButton}
      </Stack>
      {isFetching ? (
        <DataLoader />
      ) : !data?.length ? (
        <NoResults />
      ) : (
        data.map((item, index) => <DebtorCard item={item} key={index} />)
      )}
    </Box>
  );
};

export default MojCesDebtorTab;
