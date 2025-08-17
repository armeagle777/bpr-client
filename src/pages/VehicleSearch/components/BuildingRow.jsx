import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

const BuildingRow = ({
  CADASTRAL_CODE,
  PURPOSE_OF_USE_TITLE,
  TOTAL_AREA,
  section = [],
}) => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemText
          // primary={ssn}
          secondary={
            <Stack direction="row">
              <Typography
                variant="body2"
                color="text.primary"
                align="right"
                fontWeight={700}
              >
                Կադաստրային ծածկագիր {" - "} <br />
                Օգտագործման նպատակ {" - "} <br />
                Ամբողջական տարածք {" - "} <br />
              </Typography>
              <Typography
                variant="secondary"
                color="text.primary"
                sx={{ pl: 1 }}
                flexGrow={2}
              >
                {CADASTRAL_CODE} <br />
                {PURPOSE_OF_USE_TITLE} <br />
                {TOTAL_AREA} <br />
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <Typography
              variant="body2"
              color="text.primary"
              align="left"
              fontWeight={700}
            >
              Հողամասի մասեր <br />
            </Typography>
          }
        />
      </ListItem>
      <Stack>
        {section.map(
          ({
            AREA,
            FLOOR_TITLE,
            FLOOR_NUMBER,
            AREA_IS_LEGAL,
            INTERNAL_HEIGHT,
            COMPLETION_LEVEL,
            CONSTRUCTION_YEAR,
            DAMAGE_LEVEL_TITLE,
            ROOF_MATERIAL_TITLE,
            CONSTRUCTION_MATERIAL,
            CEILING_MATERIAL_TITLE,
          }) => (
            <Typography
              variant="secondary"
              color="text.primary"
              sx={{ pl: 1 }}
              flexGrow={2}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: AREA_IS_LEGAL == "0" ? "red" : "green",
                  display: "inline-block",
                }}
              ></span>{" "}
              Մակերես։ {AREA || ""}մ² | Հարկ։ {FLOOR_NUMBER || ""}(
              {FLOOR_TITLE || ""}) | Ներքին բարձրություն:{" "}
              {INTERNAL_HEIGHT || ""} | Ավարտվածություն:{" "}
              {COMPLETION_LEVEL || ""} | {CONSTRUCTION_YEAR}թ |{" "}
              {CONSTRUCTION_MATERIAL || ""}
            </Typography>
          )
        )}
      </Stack>
    </List>
  );
};

export default BuildingRow;
