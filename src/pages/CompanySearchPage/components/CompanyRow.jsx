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
    navigate(`/companies/${company.src_tin}`);
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
          {/* Left section: company base info */}
          <Stack spacing={0.5} flex={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              display="flex"
              alignItems="center"
            >
              <BusinessIcon sx={{ mr: 1, color: "primary.main" }} />
              {company?.company_name_am || ""} {company?.company_type || ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ՀՎՀՀ: {company?.src_tin || ""}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={company?.company_type_long?.toUpperCase() || ""}
                color="primary"
                size="small"
              />
              <Chip
                label={
                  company.company_is_inactive === true ? "Inactive" : "Active"
                }
                color={
                  company.company_is_inactive === true ? "error" : "success"
                }
                size="small"
              />
            </Stack>

            {/* 👉 Address & Contact Info */}
            <Stack spacing={0.3} mt={2}>
              <Typography variant="body2">
                Փոստային ինդեքս:{" "}
                {company?.br_company_address?.postal_index || "-"}
              </Typography>
              <Typography variant="body2">
                Հասցե (լրիվ):{" "}
                {company?.br_company_address?.br_full_address || "-"}
              </Typography>
              <Typography variant="body2">
                Հեռ.: {company?.br_company_address?.br_phone || "-"}{" "}
                {company?.br_mobile ? `, ${company?.br_mobile}` : ""}
              </Typography>
              {company?.br_company_address?.br_email && (
                <Typography variant="body2">
                  Email: {company?.br_company_address?.br_email}
                </Typography>
              )}
              {company?.br_company_address?.br_website && (
                <Typography variant="body2">
                  Կայք: {company?.br_company_address?.br_website}
                </Typography>
              )}
            </Stack>
          </Stack>

          {/* Right section: capital and registration */}
          <Stack spacing={0.5} alignItems="flex-end" flex={1}>
            <Typography variant="body2">
              Capital:{" "}
              {company.company_capital
                ? Number(company.company_capital).toLocaleString() + " ֏"
                : "-"}
            </Typography>
            {company.company_registered && (
              <Typography variant="body2" color="text.secondary">
                Գրանցման ա/թ: {company?.company_registered || ""}
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
