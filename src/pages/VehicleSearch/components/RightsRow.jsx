import {
  List,
  Stack,
  Divider,
  ListItem,
  Typography,
  ListItemText,
} from "@mui/material";
import OwnerRow from "./OwnerRow";
import ParcelRow from "./ParcelRow";
import BuildingRow from "./BuildingRow";
import React from "react";

const RightsRow = ({
  PARCELS = [],
  SUBJECTS = [],
  BUILDINGS = [],
  CONSTRUCTIONS = [],
  BLD_AREA,
  REG_DATE,
  PPRCL_AREA,
  RIGHT_TYPE,
  RIGHT_TERM_DATE,
  RIGHT_TERM_TYPE,
  CERTIFICATE_PASS,
  CERTIFICATE_NUMBER,
}) => {
  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={CERTIFICATE_NUMBER}
            secondary={
              <Stack direction="row">
                <Typography
                  variant="body2"
                  color="text.primary"
                  align="right"
                  fontWeight={700}
                >
                  Իրավունքի տեսակ {" - "} <br />
                  Իրավունքի գրանցման ա/թ {" - "} <br />
                  Իրավունքի կարգավիճակ {" - "} <br />
                </Typography>
                <Typography
                  variant="secondary"
                  color="text.primary"
                  sx={{ pl: 1 }}
                  flexGrow={2}
                >
                  {RIGHT_TYPE} <br />
                  {REG_DATE} <br />
                  {RIGHT_TERM_TYPE === "1" ? "ակտուալ" : "դադարած"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  align="right"
                  flexGrow={1}
                  fontWeight={700}
                >
                  Շինությունների գումարային մակերեսը {" - "} <br />
                  Հողի մակերեսը {" - "} <br />
                  Իրավունքի դադարեցման ա/թ {" - "}
                </Typography>
                <Typography
                  variant="secondary"
                  color="text.primary"
                  sx={{ pl: 1 }}
                  flexGrow={2}
                >
                  {BLD_AREA} <br />
                  {PPRCL_AREA} <br />
                  {RIGHT_TERM_DATE} <br />
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      </List>
      <Typography sx={{ mb: 0, mt: 2 }} paragraph>
        Սուբյեկտներ և բաժնեմասեր:
      </Typography>
      {!!SUBJECTS.length &&
        SUBJECTS.map((owner, index) => (
          <React.Fragment key={index}>
            <OwnerRow {...owner} />
            {index !== SUBJECTS.length - 1 && (
              <Divider variant="inset" component="hr" />
            )}
          </React.Fragment>
        ))}
      <Typography sx={{ mb: 0, mt: 2 }} paragraph>
        Հողամասեր:
      </Typography>
      {!!PARCELS.length &&
        PARCELS.map((parcel, index) => (
          <React.Fragment key={index}>
            <ParcelRow {...parcel} />
            {index !== PARCELS.length - 1 && (
              <Divider variant="inset" component="hr" />
            )}
          </React.Fragment>
        ))}
      <Typography sx={{ mb: 0, mt: 2 }} paragraph>
        Շինություններ:
      </Typography>
      {!!BUILDINGS.length &&
        BUILDINGS.map((building, index) => (
          <React.Fragment key={index}>
            <BuildingRow {...building} />
            {index !== BUILDINGS.length - 1 && (
              <Divider variant="inset" component="hr" />
            )}
          </React.Fragment>
        ))}
    </>
  );
};

export default RightsRow;
