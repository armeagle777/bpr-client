import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  Fade,
  Slide,
  useTheme,
  alpha,
} from "@mui/material";
import { Lock as LockIcon } from "@mui/icons-material";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthData from "../../hooks/useAuthData";
import Copyright from "./Copyright";

const defaultTheme = createTheme();

function Login() {
  const theme = useTheme();
  const {
    error,
    isError,
    onSubmit,
    password,
    isLoading,
    identifier,
    setPassword,
    checkErrors,
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

  const submitBtnDisabled = !serverUrl || !identifier || !password || isLoading;
  // || isError;

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
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
            },
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
          sx={{
            background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Fade in timeout={600}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                  }}
                >
                  <LockIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                </Box>
                <Typography
                  component="h1"
                  variant="h4"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  Ներքին Որոնման Համակարգ
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Խնդրում ենք մուտքագրել ձեր տվյալները
                </Typography>
              </Box>
            </Fade>
            <Slide direction="up" in timeout={800}>
              <Box
                component="form"
                noValidate
                onSubmit={onSubmit}
                sx={{
                  mt: 1,
                  width: "100%",
                  maxWidth: 400,
                }}
              >
                <Fade in timeout={1000}>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      },
                    }}
                  />
                </Fade>
                <Fade in timeout={1200}>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      },
                    }}
                  />
                </Fade>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Fade in timeout={1400}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        paddingY: "15px",
                        width: "100%",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        },
                      }}
                      loading={isLoading}
                      disabled={submitBtnDisabled}
                      fullWidth
                    >
                      Մուտք
                    </LoadingButton>
                  </Fade>
                </Box>

                {isError && (
                  <Fade in={isError} timeout={300}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error?.response?.data?.message || "Ինչ-որ բան այնպես չէ"}
                    </Alert>
                  </Fade>
                )}
                <Fade in timeout={1600}>
                  <Box sx={{ mt: 4 }}>
                    <Copyright />
                  </Box>
                </Fade>
              </Box>
            </Slide>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
