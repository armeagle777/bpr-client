import {
  Box,
  Grid,
  Card,
  Chip,
  Divider,
  Accordion,
  Typography,
  CardContent,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const EmployerCard = ({ data }) => {
  return (
    <Grid item xs={12} key={idx}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          p: 2,
          transition: "0.3s",
          "&:hover": { boxShadow: 8 },
        }}
      >
        <CardContent>
          {/* Employer Header */}
          <Typography variant="h6" color="primary" gutterBottom>
            {employer.TP_NAME}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                ՀՎՀՀ (TIN):
              </Typography>
              <Typography fontWeight="bold">{employer.TIN}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Հասցե:
              </Typography>
              <Typography fontWeight="bold">
                {employer.Address || "—"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Chip
                label={`Աշխատավարձ: ${employer.Salary?.sum || "—"} ${
                  employer.Salary?.currency || ""
                }`}
                color="success"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Chip
                label={`Զուտ եկամուտ: ${employer.Net_income?.sum || "—"} ${
                  employer.Net_income?.currency || ""
                }`}
                color="info"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Chip
                label={`Պայմանագրային եկամուտ: ${
                  employer.Contract_revenue?.sum || "—"
                }`}
                color="warning"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Positions */}
          {employer.PositionInfo && employer.PositionInfo.length > 0 ? (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  Պաշտոններ ({employer.PositionInfo.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {employer.PositionInfo.map((pos, i) => (
                  <Box
                    key={i}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "grey.50",
                      boxShadow: 1,
                    }}
                  >
                    <Typography>
                      <strong>Պաշտոն:</strong> {pos.Position || "—"}
                    </Typography>
                    <Typography>
                      <strong>Մուտք:</strong>{" "}
                      {pos.Position_Start_Date ||
                        pos.Civil_relations_StartDate ||
                        "—"}
                    </Typography>
                    <Typography>
                      <strong>Ելք:</strong>{" "}
                      {pos.Position_End_Date ||
                        pos.Civil_relations_EndDate ||
                        "—"}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography color="text.secondary" fontStyle="italic">
              Պաշտոններ չկան
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EmployerCard;
