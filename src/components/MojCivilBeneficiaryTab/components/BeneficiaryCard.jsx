import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatAmount } from "../../../utils/helperFunctions";

const BeneficiaryCard = ({ data, title = "Տուգանքի տվյալներ" }) => {
  const { debt, amount, overpay, type, start_date, end_date } = data || {};

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title={title}
        subheader={type ? `Տիպ: ${type}` : undefined}
        avatar={<AttachMoneyIcon color="primary" />}
      />

      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {debt && (
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Պարտք
              </Typography>
              <Typography variant="h6">{formatAmount(debt)}</Typography>
            </Grid>
          )}

          {amount && (
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Գումար
              </Typography>
              <Typography variant="h6">{formatAmount(amount)}</Typography>
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" gutterBottom>
              Գերծավճար
            </Typography>
            <Typography variant="body1">{overpay ?? "—"}</Typography>
          </Grid>

          {start_date && (
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Սկիզբ
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonthIcon fontSize="small" />
                <Typography>{start_date}</Typography>
              </Stack>
            </Grid>
          )}

          {end_date && (
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Անվանման վերջ
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonthIcon fontSize="small" />
                <Typography>{end_date}</Typography>
              </Stack>
            </Grid>
          )}

          {type && (
            <Grid item xs={12}>
              <Box sx={{ mt: 1 }}>
                <Chip label={type} />
              </Box>
            </Grid>
          )}

          {/* optional: show raw fine object if provided */}
          {data.fine && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Դրացյալ տուգանք (raw)
              </Typography>
              <Box component="pre" sx={{ whiteSpace: "pre-wrap", mb: 0 }}>
                {JSON.stringify(data.fine, null, 2)}
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BeneficiaryCard;
