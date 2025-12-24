import { useMemo } from 'react';
import { Alert as MuiAlert, Stack, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import useFetchWeaponsData from '../../hooks/useFetchWeaponsData.js';
import ListScileton from '../listSceleton/ListScileton';
import MuiTable from '../MuiTable/MuiTable.jsx';

import NoResults from '../NoResults/NoResults.jsx';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import WeaponsReport from '../pdf-templates/WeaponsReport';

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
  const user = useAuthUser();

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

  const hasData = data?.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const baseId = ssn || tax_id;
    const safeId = typeof baseId === 'string' ? baseId.replace(/[^\w-]/g, '_') : 'report';
    return `weapons_${safeId || 'report'}.pdf`;
  }, [ssn, tax_id]);

  const exportButton = hasData ? (
    <PDFGenerator
      PDFTemplate={WeaponsReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ PNum: ssn, taxId: tax_id, weapons: data }}
      userFullName={userFullName}
    />
  ) : null;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          Հաշվառված Զենքերի Վերաբերյալ Տեղեկատվություն
        </Typography>
        {exportButton}
      </Stack>
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
