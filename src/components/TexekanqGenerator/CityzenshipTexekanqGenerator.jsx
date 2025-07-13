import LoadingButton from "@mui/lab/LoadingButton";
import {
  Grid,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import CzOrderDocsDropdown from "./CzOrderDocsDropdown";
import { getAllowedDocuments } from "./helpers";

const CityzenshipTexekanqGenerator = ({ disabled, data, fileName, user }) => {
  const { PNum, documents } = data;
  const allowedDocuments = getAllowedDocuments(documents);

  const initialTexekanqPassports = allowedDocuments?.length
    ? [allowedDocuments[allowedDocuments.length - 1]]
    : [];
  const [mulNumber, setMulNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [texekanqPassports, setTexekanqPassports] = useState(
    initialTexekanqPassports
  );
  const { firstName, lastName, pashton } = user;

  if (!pashton) {
    return null;
  }

  const validDocument = documents.find(
    (doc) => doc.Document_Status === "PRIMARY_VALID"
  );

  const invalidDocument = documents.find(
    (doc) => doc.Document_Status === "INVALID"
  );
  const Person = validDocument?.Person || invalidDocument?.Person;
  const {
    Birth_Country,
    Birth_Date,
    Birth_Region,
    First_Name,
    Last_Name,
    Patronymic_Name,
  } = Person;

  const handleDocSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    if (!value) return;
    setTexekanqPassports(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCreateTexekanq = () => {
    const texekanqOptions = {
      pnum: PNum,
      person_birth: Birth_Date,
      person_birth_place: Birth_Region || Birth_Country.CountryName,
      person_fname: First_Name,
      person_lname: Last_Name,
      person_mname: Patronymic_Name,
      TexekanqtypeId: 1,
      mul_number: mulNumber,
      passports: texekanqPassports,
    };
    onCreateTexekanq(texekanqOptions);
    setDialogOpen(false);
  };

  return (
    <>
      {!texekanqData && (
        <>
          <LoadingButton
            fullWidth
            color="primary"
            loading={texekanqIsLoading}
            variant="outlined"
            disabled={disabled}
            onClick={() => setDialogOpen(true)}
          >
            Քաղաքացիության տեղեկանք
          </LoadingButton>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Մուտքագրել մալբրի համարը</DialogTitle>
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Մալբրի համակարգի N"
                    fullWidth
                    value={mulNumber}
                    onChange={(e) => setMulNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CzOrderDocsDropdown
                    value={texekanqPassports}
                    onChange={handleDocSelectChange}
                    documents={allowedDocuments}
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
                disabled={!mulNumber || !texekanqPassports.length}
              >
                Հաստատել
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {texekanqData && (
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
            width: "100%",
          }}
        >
          Ներբեռնել քաղաքացիության տեղեկանքը
        </a>
      )}
    </>
  );
};

export default CityzenshipTexekanqGenerator;
