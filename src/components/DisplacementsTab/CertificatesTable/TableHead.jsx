import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const TableHead = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <MuiTableHead>
      <MuiTableRow>
        <StyledTableCell align="left">Կարգավիճակ</StyledTableCell>
        <StyledTableCell align="left">N</StyledTableCell>
        <StyledTableCell align="left">Կողմից</StyledTableCell>
        <StyledTableCell align="left">Տրման ա/թ</StyledTableCell>
        <StyledTableCell align="left">Վավեր</StyledTableCell>
        <StyledTableCell align="left">Անձնագիր</StyledTableCell>
        <StyledTableCell align="left">Տպագրվել է</StyledTableCell>
        <StyledTableCell align="left">Փոխանցվել է</StyledTableCell>
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default TableHead;
