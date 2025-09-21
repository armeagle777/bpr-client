import {
  Article as ArticleIcon,
  CalendarToday as CalendarTodayIcon,
  DirectionsCar as DirectionsCarIcon,
  ExpandMore as ExpandMoreIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const ViolationsCard = ({ row, isHighSpeed }) => {
  return (
    <Grid item xs={12} md={6} key={row.rp_violation_id}>
      <Card sx={{ borderRadius: 2, boxShadow: 4 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: isHighSpeed ? "error.main" : "primary.main",
              }}
            >
              <DirectionsCarIcon />
            </Avatar>
          }
          action={
            <IconButton
              onClick={() =>
                setExpandedId(
                  expandedId === row.rp_violation_id
                    ? null
                    : row.rp_violation_id
                )
              }
            >
              <ExpandMoreIcon
                sx={{
                  transform:
                    expandedId === row.rp_violation_id
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "0.25s",
                }}
              />
            </IconButton>
          }
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontWeight={700}>{row.vehicle_number}</Typography>
              <Chip label={row.rp_violation_status_name} size="small" />
              {isHighSpeed && <Chip label="Խիստ արագություն" size="small" />}
            </Stack>
          }
          subheader={row.rp_violator_fullname}
        />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption">Մոդել</Typography>
              <Typography>{row.rp_violator_vehicle_model}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption">Տեղ</Typography>
              <Typography>{row.rp_violation_address}</Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Արյուն</Typography>
              <Typography>{row.rp_violation_type_article || "—"}</Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Ծար</Typography>
              <Typography>{row.rp_violation_date.split(" ")[0]}</Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Խնդրում են</Typography>
              <Typography>
                {formatAmount(row.rp_violation_requested_sum)}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Տուգանք</Typography>
              <Typography>{formatAmount(row.rp_violation_fine_sum)}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    icon={<ArticleIcon />}
                    label={`Decision: ${row.rp_decision_id}`}
                  />
                  <Chip
                    icon={<CalendarTodayIcon />}
                    label={row.rp_decision_date}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<MoneyIcon />}
                    label={row.rp_violation_bank_account}
                  />
                  <Chip label={row.rp_violation_status.toUpperCase()} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Collapse
            in={expandedId === row.rp_violation_id}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{
                mt: 2,
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">Մանրամասներ</Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                PSN: {row.psn}\n Decision PIN: {row.rp_decision_pin}
                \n Reporter: {row.rp_violation_reporter}\n Delivery details:{" "}
                {row.rp_violation_delivery_details}\n Vehicle owner cert:{" "}
                {row.vehicle_owner_certificate_number}
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ViolationsCard;
