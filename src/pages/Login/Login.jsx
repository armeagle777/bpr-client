import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import useAuthData from "../../hooks/useAuthData";
import Copyright from "./Copyright";

const defaultTheme = createTheme();

function Login() {
  const {
    error,
    isError,
    onSubmit,
    password,
    isLoading,
    identifier,
    setPassword,
    checkErrors,
    switchServers,
    // outerNetwork,
    setIdentifier,
    getServerUrlLoading,
    getServerIsError,
    serverUrl,
  } = useAuthData();

  const auth = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  const submitBtnDisabled =
    !serverUrl || !identifier || !password || isLoading || isError;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/login_bg.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                width: 40,
                height: 40,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundColor: "transparent",
              }}
              src={Logo}
            />
            <Typography component="h1" variant="h5">
              Ներքին Որոնման Համակարգ
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Էլ. փոստ"
                name="email"
                autoComplete="email"
                autoFocus
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Գաղտնաբառ"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* <FormControlLabel
                  onChange={switchServers}
                  control={<Switch defaultChecked={outerNetwork} />}
                  label="Ընտրել ցանցը"
                /> */}
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ paddingY: "15px" }}
                  loading={isLoading}
                  disabled={submitBtnDisabled}
                  fullWidth
                >
                  Մուտք
                </LoadingButton>
              </Box>

              {isError && (
                <Alert severity="error">
                  {error?.response?.data?.message || "Ինչ-որ բան այնպես չէ"}
                </Alert>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
