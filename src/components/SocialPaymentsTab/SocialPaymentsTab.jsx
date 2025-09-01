import React from "react";
import useFetchSocialPayments from "../../hooks/useFetchSocialPayments";
import {
  Box,
  Grid,
  Chip,
  Card,
  Divider,
  Accordion,
  Typography,
  CardContent,
  AccordionDetails,
  AccordionSummary,
  Alert as MuiAlert,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataLoader from "../DataLoader/DataLoader";
import NoResults from "../NoResults/NoResults";

const SocialPaymentsTab = ({ ssn }) => {
  const { data, error, isError, isFetching } = useFetchSocialPayments(ssn);
  const pensionData = data?.pensionData;
  const disabilityRegisterData = data?.disabilityRegisterData;
  const pyunikRegisterData = data?.pyunikRegisterData;

  if (isFetching) return <DataLoader />;

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  return (
    <Stack direction="column" gap={4}>
      {!pensionData && !disabilityRegisterData && !pyunikRegisterData && (
        <NoResults />
      )}

      {/* Pension Data */}
      {pensionData && (
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🧓 Կենսաթոշակային տվյալներ
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Անուն Ազգանուն
                </Typography>
                <Typography variant="subtitle1">
                  {pensionData[0].full_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Ծննդյան օր
                </Typography>
                <Typography variant="subtitle1">
                  {pensionData[0].birthdate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Սոցիալական քարտ
                </Typography>
                <Typography variant="subtitle1">
                  {pensionData[0].soc_card}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Աշխատանքային ստաժ
                </Typography>
                <Typography variant="subtitle1">
                  {pensionData[0].Experience?.experience}
                </Typography>
              </Grid>
            </Grid>

            {/* Pension details accordion */}
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  Կենսաթոշակի մանրամասներ
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {pensionData[0].Pension?.map((p, idx) => (
                  <Box key={idx} mb={2}>
                    <Chip
                      label={p.type}
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2">Հիմք՝ {p.law}</Typography>
                    <Typography variant="body2">
                      Ամսական գումար՝ {p.sum} ֏
                    </Typography>
                    <Typography variant="body2">
                      Սկիզբ՝ {p.assign_date}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Disability Register Data */}
      {disabilityRegisterData && (
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ♿ Հաշմանդամության տվյալներ
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">
              Պատճառ՝ {disabilityRegisterData.disabilityCause}
            </Typography>
            <Typography variant="body2">
              Գնահատում՝ {disabilityRegisterData.disabilityScoreName}
            </Typography>
            <Typography variant="body2">
              Ժամկետ՝ {disabilityRegisterData.disabilityPeriodName}
            </Typography>
            <Typography variant="body2">
              Մինչև՝ {disabilityRegisterData.disabilityDateUntil}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Pyunik Register Data */}
      {pyunikRegisterData && (
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 Փյունիկ գրանցամատյան
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">
              Պատճառ՝ {pyunikRegisterData.reason}
            </Typography>
            <Typography variant="body2">
              Խումբ՝ {pyunikRegisterData.invalid_group}
            </Typography>
            <Typography variant="body2">
              Սկիզբ՝ {pyunikRegisterData.start_date}
            </Typography>
            <Typography variant="body2">
              Վերջ՝ {pyunikRegisterData.end_date || "Անժամկետ"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default SocialPaymentsTab;
