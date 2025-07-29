import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#43485d",
        paddingTop: "1.5rem",
        paddingBottom: "1rem",
        color: "#337ab7",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">Ներքին Որոնման Համակարգ</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
