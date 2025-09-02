import { styled } from "@mui/material/styles";
import MuiTableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

import { bprDocumentTypes } from "../../utils/constants";

const TableBody = ({ rows }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <MuiTableBody>
      {rows?.length &&
        rows.map((row, index) => {
          const {
            Document_Department = "",
            Document_Number = "",
            Document_Status = "",
            Document_Type = "",
            Person,
            PassportData,
          } = row || {};

          const {
            First_Name = "",
            Last_Name = "",
            Patronymic_Name = "",
          } = Person || {};
          const { Passport_Issuance_Date = "", Passport_Validity_Date = "" } =
            PassportData || {};
          return (
            <StyledTableRow key={index}>
              <StyledTableCell align="right">
                <Tooltip
                  title={
                    Document_Status === "PRIMARY_VALID" ||
                    Document_Status === "VALID"
                      ? "Վավեր"
                      : "Անվավեր"
                  }
                  placement="left"
                >
                  <Box
                    component="div"
                    sx={{
                      width: "15px",
                      height: "15px",
                      bgcolor:
                        Document_Status === "PRIMARY_VALID" ||
                        Document_Status === "VALID"
                          ? "green"
                          : "red",
                    }}
                  />
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {`${Last_Name || ""} ${First_Name || ""} ${
                  Patronymic_Name || ""
                }`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {bprDocumentTypes[Document_Type]}
              </StyledTableCell>
              <StyledTableCell align="right">
                {Document_Number || ""}
              </StyledTableCell>
              <StyledTableCell align="right">
                {Passport_Issuance_Date || ""}
              </StyledTableCell>
              <StyledTableCell align="right">
                {Document_Department || ""}
              </StyledTableCell>
              <StyledTableCell align="right">
                {Passport_Validity_Date || ""}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
    </MuiTableBody>
  );
};

export default TableBody;
