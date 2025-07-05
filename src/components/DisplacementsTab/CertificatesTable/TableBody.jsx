import MuiTableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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
          id,
          actual,
          document_number,
          expire_date,
          issue_by_office,
          issue_date,
          serial_number,
          printed_at,
          handed_at,
        } = row;

        return (
          <StyledTableRow key={index}>
            <StyledTableCell align="right">
              <Tooltip
                title={actual === 1 ? "Վավեր" : "Անվավեր"}
                placement="left"
              >
                <Box
                  component="div"
                  sx={{
                    width: "15px",
                    height: "15px",
                    bgcolor: actual === 1 ? "green" : "red",
                  }}
                />
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {serial_number}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {issue_by_office}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {issue_date}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {expire_date}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {document_number}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {printed_at}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {handed_at}
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </MuiTableBody>
  );
};

export default TableBody;
