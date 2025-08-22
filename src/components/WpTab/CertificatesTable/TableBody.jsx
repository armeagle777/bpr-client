import MuiTableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

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
        const {
          expire_date,
          issue_date,
          printed_at,
          serial_number,
          card_status,
          transferred_at,
        } = row;

        return (
          <StyledTableRow key={`${serial_number}-${index}`}>
            <StyledTableCell align="right">
              <Tooltip
                title={card_status === "active" ? "Վավեր" : "Անվավեր"}
                placement="left"
              >
                <Box
                  component="div"
                  sx={{
                    width: "15px",
                    height: "15px",
                    bgcolor: card_status === "active" ? "green" : "red",
                  }}
                />
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {serial_number}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {issue_date}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {expire_date}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {format(new Date(printed_at), "yyyy-MM-dd")}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {format(new Date(transferred_at), "yyyy-MM-dd")}
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </MuiTableBody>
  );
};

export default TableBody;
