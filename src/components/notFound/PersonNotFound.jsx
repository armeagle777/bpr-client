import { Box, Container, Stack, Typography } from "@mui/material";

const PersonNotFound = () => {
  return (
    <Container sx={{ justifyItems: "center" }}>
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            pt: 5,
            width: "745px",
            height: "540px",
            backgroundImage: 'url("/person_not_found.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h6" align="center">
            Նշված տվյալներով անձ չի գտնվել
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default PersonNotFound;
