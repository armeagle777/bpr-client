import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import drivingLicense from "../../assets/drivingLicense.png";
import { Box, Grid, Stack } from "@mui/material";

const LicenseCard = ({ license }) => {
  const {
    image,
    person,
    denied,
    classes,
    reg_num,
    released,
    inactive,
    cllass_info,
    full_name_en,
  } = license;

  const formatLocalDate = (date) => {
    if (!date) return null;
    const [year, month, day] = date.split("-");
    return day + "/" + month + "/" + year;
  };

  const statusesMap = {
    1: "Ուժը կորցրած",
    2: "Ժամկետանց",
    3: "Կասեցված",
  };

  return (
    <Grid item xs={6}>
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <CardMedia
            height="140"
            width="20"
            image={drivingLicense}
            component="img"
            alt="Driving license"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Վարորդական Վկայական {reg_num} ({classes})
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${image}`}
                alt={full_name_en}
                sx={{ width: 75, height: 100, borderRadius: 1 }} // 3x4 ratio (75x100)
              />
              <Box>
                {cllass_info?.map((classRow, index) => {
                  const formatedDate = formatLocalDate(classRow?.added);
                  return (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {classRow?.class} - {formatedDate}
                    </Typography>
                  );
                })}
                {released && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Երկարաձգվել է {formatLocalDate(released)}
                  </Typography>
                )}
                {denied > 0 && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Կարդավիճակը։ {statusesMap[denied]}
                  </Typography>
                )}
                {inactive === 1 && (
                  <Box
                    sx={{
                      backgroundColor: "error.light",
                      color: "error.dark",
                      padding: "4px 8px",
                      borderRadius: 1,
                      display: "inline-block",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                      Զրկված վարորդական իրավունքից
                    </Typography>
                  </Box>
                )}
              </Box>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default LicenseCard;
