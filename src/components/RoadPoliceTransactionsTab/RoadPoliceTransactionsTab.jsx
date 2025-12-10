import { useMemo } from 'react';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Divider,
  Accordion,
  Typography,
  CardContent,
  AccordionDetails,
  AccordionSummary,
  Alert as MuiAlert,
  Tooltip,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import { OwnerCard } from './components';
import ListScileton from '../listSceleton/ListScileton';
import { formatAmount } from '../../utils/helperFunctions';
import useFetchRoadPoliceTransactions from '../../hooks/useFetchRoadPoliceTransactions';
import NoResults from '../NoResults/NoResults';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import RoadPoliceTransactionsReport from '../pdf-templates/RoadPoliceTransactionsReport';

const RoadPoliceTransactionsTab = ({ pnum }) => {
  const { data, error, isError, isFetching } = useFetchRoadPoliceTransactions(pnum);
  const user = useAuthUser();

  const items = Array.isArray(data?.items) ? data.items : [];
  const hasData = items.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safePnum = typeof pnum === 'string' ? pnum.replace(/[^\w-]/g, '_') : 'report';
    return `road_police_transactions_${safePnum || 'report'}.pdf`;
  }, [pnum]);

  const exportButton = hasData ? (
    <PDFGenerator
      PDFTemplate={RoadPoliceTransactionsReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ PNum: pnum, transactions: data }}
      userFullName={userFullName}
    />
  ) : null;

  if (isFetching) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  return !hasData ? (
    <NoResults />
  ) : (
    <Grid item xs={12}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          ՃՈ հաշվառումներ
        </Typography>
        {exportButton}
      </Stack>
      {items.map((tx, idx) => (
        <Grid item xs={12} key={idx}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              {/* Vehicle Header */}
              <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                {/* Big Model Title */}
                <Typography variant="h6" fontWeight={600}>
                  {tx.model ?? 'N/A'}
                </Typography>

                {/* Year as a badge */}
                <Chip
                  label={tx.released ?? 'N/A'}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />

                {/* Changeset name full text */}
                {!!tx.changeset_name && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {tx.changeset_name}
                  </Typography>
                )}
              </Stack>

              {/* Badges */}
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                <Chip
                  label={tx.vehicle_type || 'N/A'}
                  color="secondary"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={tx.reason_type || 'N/A'}
                  color="info"
                  size="small"
                  variant="outlined"
                />
                {tx.price?.trim() && (
                  <Chip
                    label={`${formatAmount(tx.price, tx.currency)}`}
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                )}
                {tx.engine_hp && <Chip label={`${tx.engine_hp} HP`} color="warning" size="small" />}
                {tx.fuel_type && (
                  <Chip label={tx.fuel_type} color="error" size="small" variant="outlined" />
                )}
              </Stack>

              {/* Vehicle Main Info */}
              <Typography variant="body2" color="text.secondary">
                VIN: {tx.vin || 'N/A'} | Գույն: {tx.color || 'N/A'} | հ/հ:{' '}
                {tx.number || tx.old_number || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Վկ։ №: {tx.cert_num || 'N/A'} | Գրանցման ա/թ: {tx.recording_date || 'N/A'}
              </Typography>
              <Divider sx={{ my: 2 }} />

              {/* Owners */}
              {!!tx.persons?.new?.length && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Նոր Սեփականատեր(եր)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {tx.persons.new.map((p, i) => (
                      <OwnerCard person={p} key={i} label="Active" />
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {!!tx.persons?.old?.length && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Նախկին Սեփականատեր(եր)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {tx.persons.old.map((p, i) => (
                      <OwnerCard person={p} key={i} label="Previous" />
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoadPoliceTransactionsTab;
