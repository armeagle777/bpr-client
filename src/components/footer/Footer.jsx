import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#43485d",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        color: "#337ab7",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">
              ՀՀ ՆԳՆ միգրացիայի և քաղաքացիության ծառայություն
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
