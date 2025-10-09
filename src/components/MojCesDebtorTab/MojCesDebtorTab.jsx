import { Box, Alert, Typography } from '@mui/material';

import NoResults from '../NoResults/NoResults';
import DebtorCard from './components/DebtorCard';
import DataLoader from '../DataLoader/DataLoader';
import useFetchMojCesData from '../../hooks/useFetchMojCesData';

const MojCesDebtorTab = ({ psn, tax_id }) => {
  const { data = [], isError, error, isFetching } = useFetchMojCesData({ psn, tax_id });

  if (isError) {
    return <Alert severity="error">{error?.message || 'Սխալ է տեղի ունեցել:'}</Alert>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        ԴԱՀԿ Գործերի Վերաբերյալ Տեղեկատվություն
      </Typography>
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
