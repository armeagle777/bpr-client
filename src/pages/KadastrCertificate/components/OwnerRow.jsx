import { List, ListItem, ListItemText, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

const OwnerRow = ({
  ssn,
  lastname,
  firstname,
  secondname,
  organization_name,
  tax_number,
  id_card,
  passport,
}) => {
  const getPersonRow = ({ firstname, lastname, secondname, ssn }) => {
    return (
      firstname +
      " " +
      lastname +
      (secondname ? ` ${secondname}` : "") +
      `${ssn ? " | ՀԾՀ - " + ssn : ""}` +
      `${id_card ? " | ID - " + id_card : ""}` +
      `${passport ? " | Անձնագիր - " + passport : ""}`
    );
  };

  const getCompanyRow = ({ organization_name, tax_number }) => {
    return organization_name + ", ՀՎՀՀ - " + tax_number;
  };

  const ownerRowText =
    ssn || (firstname && lastname)
      ? getPersonRow({ firstname, lastname, secondname, ssn })
      : organization_name
      ? getCompanyRow({ organization_name, tax_number })
      : "";
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <Typography
              variant="secondary"
              color="text.primary"
              sx={{ pl: 1 }}
              flexGrow={2}
            >
              {ownerRowText}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
};

export default OwnerRow;
