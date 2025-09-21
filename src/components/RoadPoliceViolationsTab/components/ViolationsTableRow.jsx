import {
  Article as ArticleIcon,
  CalendarToday as CalendarTodayIcon,
  DirectionsCar as DirectionsCarIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { formatAmount } from "../../../utils/helperFunctions";

const ViolationsTableRow = ({ row }) => {
  return (
    <TableRow key={row.rp_violation_id} hover>
      <TableCell>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 32, height: 32 }}>
            <DirectionsCarIcon />
          </Avatar>
          <Box>
            <Typography fontWeight={700}>{row.vehicle_number}</Typography>
            <Typography variant="caption">
              {row.rp_violator_vehicle_model}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography>{row.rp_violator_fullname}</Typography>
        <Typography variant="caption">{row.rp_violator_address}</Typography>
      </TableCell>
      <TableCell>
        <Chip
          icon={<ArticleIcon />}
          label={row.rp_violation_type_article || "—"}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1} alignItems="center">
          {row.rp_violation_type === "speed" ? (
            <Chip
              icon={<SpeedIcon />}
              label={`Ամփոփ: ${row.rp_violation_speed} km/h`}
              size="small"
            />
          ) : (
            <Chip label={row.rp_violation_type} size="small" />
          )}
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarTodayIcon fontSize="small" />
          <Typography>{row.rp_violation_date.split(" ")[0]}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">
        {formatAmount(row.rp_violation_requested_sum)}
      </TableCell>
      <TableCell align="right">
        {formatAmount(row.rp_violation_fine_sum)}
      </TableCell>
    </TableRow>
  );
};

export default ViolationsTableRow;
