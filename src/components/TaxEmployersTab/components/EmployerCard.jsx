import { useState } from "react";
import {
  Box,
  Card,
  Grid,
  List,
  Chip,
  Divider,
  ListItem,
  Collapse,
  Typography,
  IconButton,
  CardContent,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Work as WorkIcon,
  LocationOn as LocationOnIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AccountBalance as AccountBalanceIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import { isNumeric } from "../TaxEmployersTab.helpers";

const EmployerCard = ({ employer }) => {
  const [openPositions, setOpenPositions] = useState(false);

  return (
    <Grid item sm={12}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 6,
          p: 2,
          transition: "0.3s",
          "&:hover": { boxShadow: 10 },
          bgcolor: "background.paper",
          width: "100%",
        }}
      >
        <CardContent>
          {/* Header */}
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
            gutterBottom
          >
            {employer.TP_NAME}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                ՀՎՀՀ (TIN):
              </Typography>
              <Typography fontWeight="bold">{employer.TIN}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon color="action" fontSize="small" />
                <Typography>{employer.Address || "—"}</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Chips Row */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {isNumeric(employer.Salary?.sum) && (
              <Grid item xs={12} sm={4}>
                <Chip
                  icon={<MonetizationOnIcon />}
                  label={`Աշխատավարձ: ${employer.Salary?.sum || "—"} ${
                    employer.Salary?.currency || ""
                  }`}
                  color="success"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {isNumeric(employer.Net_income?.sum) && (
              <Grid item xs={12} sm={4}>
                <Chip
                  icon={<AccountBalanceIcon />}
                  label={`Զուտ եկամուտ: ${employer.Net_income?.sum || "—"} ${
                    employer.Net_income?.currency || ""
                  }`}
                  color="info"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {isNumeric(employer.Contract_revenue?.sum) && (
              <Grid item xs={12} sm={4}>
                <Chip
                  icon={<WorkIcon />}
                  label={`Պայմանագրային եկամուտ: ${
                    employer.Contract_revenue?.sum || "—"
                  }`}
                  color="warning"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Positions Timeline Style */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Պաշտոններ
            </Typography>
            {employer.PositionInfo?.length > 0 && (
              <IconButton
                onClick={() => setOpenPositions(!openPositions)}
                size="small"
              >
                {openPositions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Box>

          <Collapse in={openPositions} timeout="auto" unmountOnExit>
            <List>
              {employer.PositionInfo?.map((pos, i) => (
                <ListItem
                  key={i}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    boxShadow: 1,
                  }}
                >
                  <ListItemIcon>
                    <WorkIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={pos.Position}
                    secondary={
                      <>
                        <Typography variant="body2">
                          Մուտք:{" "}
                          <strong>
                            {pos.Position_Start_Date ||
                              pos.Civil_relations_StartDate ||
                              "—"}
                          </strong>
                        </Typography>
                        <Typography variant="body2">
                          Ելք:{" "}
                          <strong>
                            {pos.Position_End_Date ||
                              pos.Civil_relations_EndDate ||
                              "—"}
                          </strong>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {!employer.PositionInfo?.length && (
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
