import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

const OwnerCard = ({ person, label }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1,
        borderRadius: 2,
        borderColor: "divider",
        bgcolor: "grey.50",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip
            label={label}
            color={label === "Active" ? "success" : "default"}
            size="small"
          />
          {person.nationality && (
            <Chip
              label={person.nationality}
              color="secondary"
              size="small"
              variant="outlined"
            />
          )}
        </Stack>

        <Typography variant="subtitle2">
          {person.first_name} {person.middle_name} {person.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {person.identification_no || "N/A"} | SSN: {person.ssn || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Սկիզբ: {person.joined_date || "N/A"} | Ավարտ:{" "}
          {person.left_date || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Հեռ: {person.address?.mobile || person.address?.phone || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Հասցե: {person.address?.house || ""} {person.address?.street1 || ""},{" "}
          {person.address?.community || ""}, {person.address?.province || ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OwnerCard;
