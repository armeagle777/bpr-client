import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SpeedIcon from "@mui/icons-material/Speed";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { formatAmount } from "../../../utils/helperFunctions";

const PhysicalVehicleCard = ({ item }) => {
  const service = item.physical_vehicles_service;
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
      <CardContent>
        {/* Vehicle Header */}
        <Box display="flex" alignItems="center" mb={1}>
          <DirectionsCarIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
          <Typography variant="h6" color="primary">
            {service?.make} {service?.type} ({service?.vehicle_number})
          </Typography>
        </Box>

        {/* Chips Row */}
        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
          {service?.released && (
            <Chip
              icon={<CalendarTodayIcon />}
              label={`Արտադրված: ${service.released}`}
              color="default"
              variant="outlined"
            />
          )}
          {service?.engine_hp && (
            <Chip
              icon={<SpeedIcon />}
              label={`${service.engine_hp} Ձիաուժ`}
              color="default"
              variant="outlined"
            />
          )}
          {service?.start_date && (
            <Chip
              icon={<EventAvailableIcon />}
              label={`Սկիզբ: ${service.start_date}`}
              color="default"
              variant="outlined"
            />
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Persons + Taxes */}
        {item.physical_vehicles_persons?.map((person, pIdx) => (
          <Box key={pIdx} mb={3}>
            <Typography variant="subtitle1" gutterBottom>
              👤 {person.mta_get_taxes_last_name || ""}{" "}
              {person.mta_get_taxes_first_name || ""}
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Տարի</TableCell>
                  <TableCell align="right">Հարկ (֏)</TableCell>
                  <TableCell align="right">Պարտք (֏)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {person.physical_vehicles_taxes?.map((t, tIdx) => (
                  <TableRow key={tIdx}>
                    <TableCell>{t.year || ""}</TableCell>
                    <TableCell align="right">
                      {t.physical_vehicles_tax_item?.amount
                        ? formatAmount(t.physical_vehicles_tax_item.amount)
                        : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {t.physical_vehicles_tax_item?.debt
                        ? formatAmount(t.physical_vehicles_tax_item.debt)
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default PhysicalVehicleCard;
