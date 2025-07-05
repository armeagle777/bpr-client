import { List, ListItem, ListItemText, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

const ParcelRow = ({ CADASTRAL_CODE, PARTS = [] }) => {
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
                Հողամասի կադաստրային ծածկագիր {" - "} <br />
                Հողամասի մասեր {" - "} <br />
              </Typography>
              <Typography
                variant="secondary"
                color="text.primary"
                sx={{ pl: 1 }}
                flexGrow={2}
              >
                {CADASTRAL_CODE} <br />
                {PARTS.map(
                  (part) =>
                    `${part.DESIGNATED_USE_TYPE_TITLE} - ${part.LEGAL_AREA} hա`
                )}{" "}
                <br />
              </Typography>
            </Stack>
          }
        />
      </ListItem>
    </List>
  );
};

export default ParcelRow;
