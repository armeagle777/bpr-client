import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const LogItem = ({ log }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        mb: 2,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} mb={1}>
          <HistoryIcon color="action" />
          <Typography variant="h6">
            {log.User.firstName} {log.User.lastName} | {log.User.email}
          </Typography>

          <Chip
            label={log.LogType.name}
            color="primary"
            size="small"
            sx={{ fontWeight: "bold" }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: "auto" }}
          >
            {new Date(log.createdAt).toLocaleString()}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Accordion elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" color="text.secondary">
              Մանրամասներ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="pre"
              sx={{
                bgcolor: "#1e1e1e",
                color: "#d4d4d4",
                p: 2,
                borderRadius: 2,
                fontFamily: "monospace",
                fontSize: 14,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowX: "auto",
                "& code": {
                  color: "#9cdcfe",
                },
              }}
            >
              <code>{JSON.stringify(log.fields, null, 2)}</code>
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default LogItem;
