import { Gavel as GavelIcon, Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';

import { formatAmount } from '../../../utils/helperFunctions';

const DebtorCard = ({ item }) => {
  return (
    <Card
      key={item.cer_inquest_id}
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <GavelIcon color="primary" />
              <Typography variant="h6">Գործ № {item.cer_order_number}</Typography>
              <Chip label={`Ստատուս: ${item.cer_inquest_status}`} color="secondary" size="small" />
            </Box>
            <Divider />
          </Grid>

          {/* Debtor Info */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <PersonIcon color="action" />
              <Typography variant="subtitle1">{item.cer_debtor_full_name}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <HomeIcon color="action" />
              <Typography variant="body2">{item.cer_debtor_full_address}</Typography>
            </Box>
          </Grid>

          {/* Order Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" gutterBottom>
              <strong>Դատարան:</strong> {item.cer_court_code}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Հայցվոր:</strong> {item.cer_inquest_plaintiff_name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Նկարագրություն:</strong> {item.cer_order_description || '—'}
            </Typography>
          </Grid>

          {/* Amounts */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={6} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  Կատարողական ծախսեր
                </Typography>
                <Typography variant="subtitle1">
                  {formatAmount(item.cer_inquest_charged_amount)} ֏
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  Բռնագանձման գումար
                </Typography>
                <Typography variant="subtitle1">
                  {formatAmount(item.cer_inquest_recovered_amount)} ֏
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  Հայցի գումար
                </Typography>
                <Typography variant="subtitle1">
                  {formatAmount(item.cer_inquest_claimed_amount)} ֏
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  Վարույթի մնացորդ
                </Typography>
                <Typography variant="subtitle1">
                  {formatAmount(item.cer_inquest_remained_amount)} ֏
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  Ալիմենտի գումար
                </Typography>
                <Typography variant="subtitle1">
                  {formatAmount(item.cer_inquest_aliment_amount)} ֏
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="body2" color="text.secondary">
                  Տոկոսի հաշվարկ
                </Typography>
                <Typography variant="subtitle1">{item.cer_inquest_calculated_percent}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Dates and Article Info */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={6} sm={2.4}>
                <Typography variant="body2" color="text.secondary">
                  Պատվերի ամսաթիվ
                </Typography>
                <Typography variant="subtitle1">{item.cer_order_date || '—'}</Typography>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography variant="body2" color="text.secondary">
                  Վարույթի ամսաթիվ
                </Typography>
                <Typography variant="subtitle1">{item.cer_inquest_date || '—'}</Typography>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography variant="body2" color="text.secondary">
                  Փոփոխության ամսաթիվ
                </Typography>
                <Typography variant="subtitle1">{item.cer_order_change_date || '—'}</Typography>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography variant="body2" color="text.secondary">
                  Մուտքագրման ամսաթիվ
                </Typography>
                <Typography variant="subtitle1">{item.cer_inquest_input_date || '—'}</Typography>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography variant="body2" color="text.secondary">
                  Հոդված
                </Typography>
                <Typography variant="subtitle1">{item.cer_order_change_article || '—'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DebtorCard;
