import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { qkagDocumentTypes } from "../../utils/constants";
import { formatDates } from "../../utils/helperFunctions";

const MedRow = ({ med }) => {
  const {
    death,
    institution_name,
    document_name,
    document_number,
    document_date,
  } = { ...med };
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Med" src="/red-cross.png" />
        </ListItemAvatar>
        <ListItemText
          primary={institution_name || ""}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Փաստաթղթի N:
              </Typography>{" "}
              {document_number || ""}
              {"; "}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ամսաթիվ:
              </Typography>{" "}
              {document_date}
              {death && (
                <>
                  <br />
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Մահվան ա/թ:
                  </Typography>{" "}
                  {med.death.date}
                  {"; "}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Մահվան վայր:
                  </Typography>{" "}
                  {med.death.place || ""} {"; "}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Մահվան պատճառ:
                  </Typography>{" "}
                  {med.death.reason} {"; "}
                </>
              )}
            </>
          }
        />
      </ListItem>
    </ListItemButton>
  );
};

export default MedRow;
