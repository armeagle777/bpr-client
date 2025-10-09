import { Alert as MuiAlert, Typography } from '@mui/material';

import useFetchWeaponsData from '../../hooks/useFetchWeaponsData.js';
import ListScileton from '../listSceleton/ListScileton';
import MuiTable from '../MuiTable/MuiTable.jsx';

import NoResults from '../NoResults/NoResults.jsx';

const WeaponsTab = ({ ssn, tax_id }) => {
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchWeaponsData({
    ssn,
    tax_id,
  });

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  const columns = [
    { title: 'N', key: 'ZHAMAR' },
    { title: 'Անունը', key: 'ZANUN_NAME' },
    { title: 'Տեսակը', key: 'ZTYPE_NAME' },
    {
      title: 'Հասցե',
      key: 'HASCE',
      hiddenInMain: true,
      render: (row) =>
        `${row.HASCE || ''}, ${row.ABNAK || ''}, ${row.APOXOC || ''}, ${row.ASHENQ || ''} ${
          row.ABNAKARAN || ''
        }`,
    },
    { title: 'Փ/թ', key: 'PASSPORT', hiddenInMain: true },
    { title: 'Թույլտվության տ/կ', key: 'TTYPE_NAME', hiddenInMain: true },
    { title: 'Թույլտվության ա/թ', key: 'TDATE', hiddenInMain: true },
    { title: 'Պատկանում է', key: 'ZPATK1_NAME', hiddenInMain: true },
    { title: 'Գրանցված է', key: 'GRANC_NAME', hiddenInMain: true },
    { title: 'Բաժինը', key: 'TBAJIN', hiddenInMain: true },
    {
      title: 'ԱԱՀ',
      key: 'AZG',
      render: (row) => `${row.ANUN || ''} ${row.AZG || ''} ${row.HAYR || ''}`,
    },
    { title: 'Ծննդ. ա/թ', key: 'BDATE' },
    { title: 'ՀԾՀ / ՀՎՀՀ', key: 'SSN' },
    { title: 'Տ/չ', key: 'KALIBR' },
  ];

  return (
    <>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        Հաշվառված Զենքերի Վերաբերյալ Տեղեկատվություն
      </Typography>
      {isFetching ? (
        <ListScileton />
      ) : !data?.length ? (
        <NoResults />
      ) : (
        <MuiTable rows={data} columns={columns} />
      )}
    </>
  );
};

export default WeaponsTab;
