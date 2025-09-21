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
import { useState } from "react";
import { formatAmount } from "../../../utils/helperFunctions";
import { decisionReceivedDetailsMap } from "../RoadPoliceViolationsTab.constants";

const ViolationsCard = ({ row, isHighSpeed }) => {
  const [expandedId, setExpandedId] = useState(null);
  return (
    <Grid item xs={12}>
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
            {/* Vehicle & Location */}
            <Grid item xs={12} sm={6}>
              <Typography variant="caption">Մոդել</Typography>
              <Typography>{row.rp_violator_vehicle_model}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption">Վայր</Typography>
              <Typography>{row.rp_violation_address}</Typography>
            </Grid>

            {/* Violation Core */}
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Հոդված</Typography>
              <Typography>{row.rp_violation_type_article || "—"}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Օրենսգրքի կետ</Typography>
              <Typography>{row.rp_violation_type_part || "—"}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Մաս</Typography>
              <Typography>{row.rp_violation_type_prim || "—"}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Տեսակ</Typography>
              <Typography>{row.rp_violation_type}</Typography>
            </Grid>

            {/* Violation Details */}
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Խախտման ա/թ</Typography>
              <Typography>{row.rp_violation_date.split(" ")[0]}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Տուգանային միավոր</Typography>
              <Typography>{row.rp_violation_point}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Արագություն</Typography>
              <Typography>{row.rp_violation_speed}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Փակված է</Typography>
              <Typography>{row.rp_violation_closed ? "Այո" : "Ոչ"}</Typography>
            </Grid>

            {/* Payment Info */}
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Պահանջվում է</Typography>
              <Typography>
                {formatAmount(row.rp_violation_requested_sum)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Տուգանքի գումար</Typography>
              <Typography>{formatAmount(row.rp_violation_fine_sum)}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Բռնագանձման գումար</Typography>
              <Typography>
                {formatAmount(row.rp_violation_payable_sum) || "—"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Վճարված</Typography>
              <Typography>
                {formatAmount(row.rp_violation_payed_sum) || "—"}
              </Typography>
            </Grid>

            {/* Violator Address */}
            <Grid item xs={12}>
              <Typography variant="caption">Խախտողի հասցե</Typography>
              <Typography>{row.rp_violator_address}</Typography>
            </Grid>

            {/* Divider with Decision Info */}
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
                    label={`Որոշման N: ${row.rp_decision_id}`}
                  />
                  <Chip
                    icon={<CalendarTodayIcon />}
                    label={row.rp_decision_date}
                  />
                  <Chip
                    label={`Տեղեկացման օր՝ ${
                      row.rp_decision_received_date || "—"
                    }`}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<MoneyIcon />}
                    label={row.rp_violation_bank_account}
                  />
                  <Chip label={row.rp_violation_status_name.toUpperCase()} />
                </Stack>
              </Stack>
            </Grid>

            {/* Extra Dates */}
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Առաքման ա/թ</Typography>
              <Typography>{row.posted_date}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Վճարման ա/թ</Typography>
              <Typography>{row.payment_date}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Ծանուցման ա/թ</Typography>
              <Typography>{row.rp_violation_delivery_date}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption">Ազդարարի ա/թ</Typography>
              <Typography>
                {row.rp_violation_azdarar_send_date || "—"}
              </Typography>
            </Grid>
          </Grid>

          {/* Collapse for details */}
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
                ՀԾՀ: {row.psn} | Որոշման պայմանանիշ: {row.rp_decision_pin || ""}{" "}
                | Խախտման արձանագրող: {row.rp_violation_reporter} | Առաքման
                Տվյալներ:{" "}
                {decisionReceivedDetailsMap[row.rp_decision_received_detail] ||
                  ""}{" "}
                | Վարորդական վկ.: {row.vehicle_owner_certificate_number}
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ViolationsCard;
