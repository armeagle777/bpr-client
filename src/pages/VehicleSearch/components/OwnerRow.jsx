import { List, ListItem, ListItemText, Typography } from "@mui/material";

const OwnerRow = ({ ssn, lastname, firstname }) => {
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
            <Typography
              variant="secondary"
              color="text.primary"
              sx={{ pl: 1 }}
              flexGrow={2}
            >
              {firstname} {lastname}, ՀԾՀ - {ssn}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
};

export default OwnerRow;
