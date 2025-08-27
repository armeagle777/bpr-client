import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Divider,
  Alert as MuiAlert,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import useFetchRoadPoliceTransactions from "../../hooks/useFetchRoadPoliceTransactions";
import ListScileton from "../listSceleton/ListScileton";
import DocumentNotFound from "../family/DocumentNotFound";
import { TRANSACTIONS_NOT_FOUND_MESSAGE } from "./RoadPoliceTransactionsTab.helpers";
import { OwnerCard } from "./components";

const RoadPoliceTransactionsTab = ({ pnum }) => {
  const { data, error, isError, isFetching } = useFetchRoadPoliceTransactions();

  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  return !data?.items?.length ? (
    <DocumentNotFound notification={TRANSACTIONS_NOT_FOUND_MESSAGE} />
  ) : (
    <Grid container spacing={2}>
      {data?.items?.map((tx, idx) => (
        <Grid item xs={12} key={idx}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {tx.model ?? "Unknown Model"}{" "}
                <Chip label={tx.released ?? "Unknown Year"} size="small" />
              </Typography>

              <Typography variant="body2" color="text.secondary">
                VIN: {tx.vin || "N/A"} | Color: {tx.color || "N/A"} | Plate:{" "}
                {tx.number || tx.old_number || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Reg №: {tx.reg_num || "N/A"} | Engine HP:{" "}
                {tx.engine_hp || "N/A"} | Fuel: {tx.fuel_type || "N/A"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Price: {tx.price ? `${tx.price} ${tx.currency}` : "N/A"}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Current Owner(s)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {tx.persons?.new?.length ? (
                    tx.persons.new.map((p, i) => (
                      <OwnerCard person={p} key={i} label="Active" />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No active owners
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Previous Owner(s)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {tx.persons?.old?.length ? (
                    tx.persons.old.map((p, i) => (
                      <OwnerCard person={p} key={i} label="Previous" />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No previous owners
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoadPoliceTransactionsTab;
