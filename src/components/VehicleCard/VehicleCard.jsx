import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpeedIcon from "@mui/icons-material/Speed";
import WarningIcon from "@mui/icons-material/Warning";
import BuildIcon from "@mui/icons-material/Build";
import HolderSection from "./HolderSection";
import LenderSection from "./LenderSection";

const VehicleCard = ({ car }) => {
  const holder =
    car.rp_vehicle_holder ||
    car.rp_vehicle_owners?.find((owner) => owner.rp_is_holder === true);
  const otherOwners = car.rp_vehicle_owners?.filter(
    (owner) => owner.rp_is_holder !== true
  );

  return (
    <Grid item xs={9}>
      <Card sx={{ width: "100%", mx: "auto", boxShadow: 4 }}>
        {/* Header */}
        <CardHeader
          avatar={<DirectionsCarIcon color="primary" />}
          title={`${car.model_name} - ${car.vehicle_model} - ${
            car.cert_num || car.vehicle_registration_certificate_number
          }`}
          subheader={`Կարգաիճակը: ${car.vehicle_registration_status}`}
        />

        <CardContent>
          <Grid container spacing={2}>
            {/* Registration & Status */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <AssignmentIndIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Հաշվառման համարանիշը
              </Typography>
              <Box
                sx={{
                  width: 150,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url("/plate.png")`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000",
                    letterSpacing: 2,
                    fontFamily: "'DIN 1451 Mittelschrift', sans-serif",
                  }}
                >
                  {car.vehicle_number}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <VerifiedUserIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                ԱՊՊԱ
              </Typography>
              <Chip
                label={
                  car.rp_vehicle_insurance_details?.vehicle_insurance_company
                }
                color="success"
                variant="outlined"
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                Վավեր:{" "}
                {car.rp_vehicle_insurance_details?.vehicle_insurance_start_date}{" "}
                - {car.rp_vehicle_insurance_details?.vehicle_insurance_end_date}
              </Typography>
            </Grid>

            {/* VIN & Special Notes */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <BuildIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Նույնականացման համարը(VIN)
              </Typography>
              <Typography>{car.vehicle_vin}</Typography>
            </Grid>

            {car.special_notes && (
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  <WarningIcon
                    fontSize="small"
                    sx={{ verticalAlign: "middle", mr: 1 }}
                  />
                  Հատուկ նշումներ
                </Typography>
                <Typography>{car.vehicle_special_notes}</Typography>
              </Grid>
            )}

            {/* Realease year */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <CalendarTodayIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Թողարկման տարեթիվը
              </Typography>
              <Typography>{car.vehicle_release_date}</Typography>
            </Grid>

            {/* Engine & Fuel */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <LocalGasStationIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Շարժիչի տեսակը
              </Typography>
              <Typography>
                {car.fuel} ({car.vehicle_fuel_type})
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <SpeedIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Շարժիչի հզորությունը (ԿՎՏ / ՁՈՒ)
              </Typography>
              <Typography>
                {car.vehicle_engine_power} kW / {car.vehicle_engine_hp} HP
              </Typography>
            </Grid>

            {/* Transit & Temporary Numbers */}
            {car.vehicle_transit_number && (
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Ժամանակավոր համարանիշը
                </Typography>
                <Typography>{car.vehicle_transit_number}</Typography>
              </Grid>
            )}

            {car.vehicle_temporary_number && (
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Ժամանակավոր համարանիշը
                </Typography>
                <Typography>{car.vehicle_temporary_number}</Typography>
              </Grid>
            )}

            {/* Recording Date & Body Type */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                <CalendarTodayIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Տրված է
              </Typography>
              <Typography>{car.vehicle_recording_date}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Թափքի տեսակը
              </Typography>
              <Typography>
                {car.vehicle_type} / {car.vehicle_body_type}
              </Typography>
            </Grid>
          </Grid>

          {/* Holder Details */}
          {holder && <HolderSection holder={holder} />}

          {/* Owners Details */}
          {otherOwners?.map((owner, index) => (
            <HolderSection key={index} holder={owner} />
          ))}

          {/* Lender Details */}
          {car.lenders?.map((lender, index) => (
            <LenderSection key={index} lender={lender} />
          ))}

          {/* Inactive & Blocked Status */}
          {(!!car.inactive || !!car.is_blocked) && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" gap={2}>
                {!!car.inactive && (
                  <Chip label="Հաշվառումից հանված" color="warning" />
                )}
                {!!car.is_blocked && (
                  <Chip label="Կիրառված սահմանափակումներ" color="error" />
                )}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VehicleCard;
