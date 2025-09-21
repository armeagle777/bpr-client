import {
  Box,
  Card,
  Grid,
  Chip,
  Alert,
  Divider,
  Typography,
  CardContent,
} from "@mui/material";
import {
  Home as HomeIcon,
  Gavel as GavelIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

import NoResults from "../NoResults/NoResults";
import DataLoader from "../DataLoader/DataLoader";
import { formatAmount } from "../../utils/helperFunctions";
import useFetchMojCesData from "../../hooks/useFetchMojCesData";

const MojCesDebtorTab = ({ psn, tax_id }) => {
  const {
    data = [],
    isError,
    error,
    isFetching,
  } = useFetchMojCesData({ psn, tax_id });

  if (isError) {
    return (
      <Alert severity="error">{error?.message || "Սխալ է տեղի ունեցել:"}</Alert>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
      <Typography
        variant="h5"
        color="primary"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2 }}
      >
        ԴԱՀԿ Գործերի Վերաբերյալ Տեղեկատվություն
      </Typography>
      {isFetching ? (
        <DataLoader />
      ) : !data?.length ? (
        <NoResults />
      ) : (
        data.map((item) => (
          <Card
            key={item.cer_inquest_id}
            variant="outlined"
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                {/* Header */}
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <GavelIcon color="primary" />
                    <Typography variant="h6">
                      Գործ № {item.cer_order_number}
                    </Typography>
                    <Chip
                      label={`Ստատուս: ${item.cer_inquest_status}`}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  <Divider />
                </Grid>

                {/* Debtor Info */}
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon color="action" />
                    <Typography variant="subtitle1">
                      {item.cer_debtor_full_name}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <HomeIcon color="action" />
                    <Typography variant="body2">
                      {item.cer_debtor_full_address}
                    </Typography>
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
                    <strong>Նկարագրություն:</strong>{" "}
                    {item.cer_order_description || "—"}
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
                      <Typography variant="subtitle1">
                        {item.cer_inquest_calculated_percent}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default MojCesDebtorTab;
