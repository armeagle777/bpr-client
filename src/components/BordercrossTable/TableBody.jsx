import { styled } from "@mui/material/styles";
import MuiTableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import {
  formatDateTimeString,
  getDirectionColor,
} from "../../utils/helperFunctions";
import { Chip } from "@mui/material";

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
      {rows?.map((row, index) => {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row">
              {`${row.name} ${row.surname ? row.surname : ""}`}
            </StyledTableCell>
            <StyledTableCell align="center">{row.passport}</StyledTableCell>
            <StyledTableCell align="center">
              {formatDateTimeString(row.birthDate, false)}
            </StyledTableCell>
            <StyledTableCell align="center">
              {formatDateTimeString(row.datetime, true)}
            </StyledTableCell>
            <StyledTableCell align="center">
              <Chip
                label={row.direction}
                color={getDirectionColor(row.direction)}
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              />
            </StyledTableCell>
            <StyledTableCell align="center">{row.status}</StyledTableCell>
          </StyledTableRow>
        );
      })}
    </MuiTableBody>
  );
};

export default TableBody;
