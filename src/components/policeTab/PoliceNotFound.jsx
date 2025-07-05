import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const PoliceNotFound = () => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/no_document.png"
        alt="No document found"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            Տվյալ անձի վերաբերյալ տվյալներ չկան գրանցված ԻԿ-ում
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PoliceNotFound;
