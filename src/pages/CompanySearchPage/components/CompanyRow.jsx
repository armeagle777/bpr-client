import {
  Box,
  Card,
  Chip,
  Stack,
  Button,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Business as BusinessIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
} from "@mui/icons-material";

const CompanyRow = ({ company }) => {
  const navigate = useNavigate();
  const handleSeeMore = () => {
    navigate(`/companies/${company.id}`);
  };
  return (
    <Card
      sx={{
        mb: 2,
        p: 1,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={0.5} flex={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              display="flex"
              alignItems="center"
            >
              <BusinessIcon sx={{ mr: 1, color: "primary.main" }} />
              {company?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ՀՎՀՀ: {company?.taxId}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={company?.type?.toUpperCase() || ""}
                color="primary"
                size="small"
              />
              <Chip
                label={company.inactive === "1" ? "Inactive" : "Active"}
                color={company.inactive === "1" ? "error" : "success"}
                size="small"
              />
            </Stack>
          </Stack>

          <Stack spacing={0.5} alignItems="flex-end" flex={1}>
            <Typography variant="body2">
              Capital:{" "}
              {company.capital
                ? Number(company.capital).toLocaleString() + " ֏"
                : "-"}
            </Typography>
            {company.registered && (
              <Typography variant="body2" color="text.secondary">
                Գրանցման ա/թ: {company?.registerDate || ""}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleSeeMore}>
          Մանրամասն
        </Button>
      </CardActions>
    </Card>
  );
};

export default CompanyRow;
