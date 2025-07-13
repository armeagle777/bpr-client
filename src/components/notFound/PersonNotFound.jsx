import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { userHasPermission } from "../../utils/helperFunctions";
import { permissionsMap } from "../../utils/constants";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PersonNotFound = ({ filterProps }) => {
  const user = useAuthUser();

  const [texekanqFields, setTexekanqFields] = useState({
    firstName: filterProps.firstName,
    lastName: filterProps.lastName,
    patronomicName: filterProps.patronomicName,
    birthDate: filterProps.birthDate,
    birthPlace: "",
    mulNumber: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const isFormValid =
    !!texekanqFields.firstName?.trim() &&
    !!texekanqFields.lastName?.trim() &&
    !!texekanqFields.birthDate &&
    !!texekanqFields.birthPlace?.trim() &&
    !!texekanqFields.mulNumber?.trim();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    const newValue =
      name === "birthDate" || name === "mulNumber"
        ? value
        : value.toUpperCase();
    setTexekanqFields({ ...texekanqFields, [name]: newValue });
  };

  const handleCreateTexekanq = () => {
    if (!isFormValid) return;
    onCreateTexekanq({
      person_birth: texekanqFields.birthDate,
      person_birth_place: texekanqFields.birthPlace,
      person_fname: texekanqFields.firstName,
      person_lname: texekanqFields.lastName,
      person_mname: texekanqFields.patronomicName,
      TexekanqtypeId: 1,
      mul_number: texekanqFields.mulNumber,
    });
    setDialogOpen(false);
  };

  const canCreateTexekanq = userHasPermission(
    [
      permissionsMap.CITIZENSHIP_REPORT.uid,
      permissionsMap.PASSPORTS_REPORT.uid,
      permissionsMap.PNUM_REPORT.uid,
      permissionsMap.ADMIN.uid,
    ],
    user.permissions
  );
  const fileName = `bpr_${texekanqFields.firstName}_${texekanqFields.lastName}.pdf`;
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
          {canCreateTexekanq && !texekanqData ? (
            <LoadingButton
              loading={texekanqIsLoading}
              color="primary"
              variant="outlined"
              onClick={() => setDialogOpen(true)}
            >
              Տրամադրել քաղաքացի չլինելու վերաբերյալ տեղեկանք
            </LoadingButton>
          ) : canCreateTexekanq && texekanqData ? (
            <a
              href={`data:application/pdf;base64,${texekanqData}`}
              download={fileName}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px", // For spacing between text and icon
                padding: "6px 16px", // Matches MUI button padding
                borderRadius: "4px", // Matches MUI's default button radius
                backgroundColor: "#d32f2f", // MUI error color
                color: "white",
                textDecoration: "none",
                fontSize: "0.875rem", // MUI button font size
                fontWeight: 500,
                lineHeight: 1.75,
                transition: "background-color 0.3s, color 0.3s",
                cursor: "pointer",
                border: "none",
              }}
            >
              Ներբեռնել քաղաքացիության տեղեկանքը
            </a>
          ) : null}
        </Box>
      </Stack>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Մուտքագրել անձի տվյալները</DialogTitle>
        <DialogContent style={{ paddingTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Անուն"
                type="search"
                id="firstName"
                name="firstName"
                fullWidth
                onChange={inputChangeHandler}
                value={texekanqFields.firstName}
                required
                //   onFocus={onNameFocus}
                //   onBlur={onNameBlur}
                //   disabled={nameDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="search"
                id="lastName"
                name="lastName"
                label="Ազգանուն"
                fullWidth
                onChange={inputChangeHandler}
                value={texekanqFields.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="search"
                label="Հայրանուն"
                id="patronomicName"
                name="patronomicName"
                onChange={inputChangeHandler}
                value={texekanqFields.patronomicName}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              {/* <TextField
                required
                type="date"
                id="birthDate"
                name="birthDate"
                label="Ծննդ․ թիվ"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={inputChangeHandler}
                value={texekanqFields.birthDate}
                fullWidth
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ծննդ․ թիվ"
                  value={
                    texekanqFields.birthDate
                      ? dayjs(texekanqFields.birthDate, "DD/MM/YYYY")
                      : null
                  }
                  onChange={(newValue) => {
                    const formattedDate = newValue
                      ? dayjs(newValue).format("DD/MM/YYYY")
                      : "";
                    inputChangeHandler({
                      target: { name: "birthDate", value: formattedDate },
                    });
                  }}
                  format="DD/MM/YYYY"
                  renderInput={(params) => <TextField required {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="birthPlace"
                id="birthPlace"
                name="birthPlace"
                label="Ծննդավայր"
                onChange={inputChangeHandler}
                value={texekanqFields.birthPlace}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="search"
                id="mulNumber"
                name="mulNumber"
                // autoFocus
                label="Մալբրի համակարգի N"
                fullWidth
                value={texekanqFields.mulNumber}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Չեղարկել
          </Button>
          <Button
            onClick={handleCreateTexekanq}
            color="primary"
            disabled={!isFormValid}
          >
            Հաստատել
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PersonNotFound;
