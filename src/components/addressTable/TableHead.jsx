import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableHead = () => {
  return (
    <MuiTableHead>
      <TableRow>
        <StyledTableCell>ՀԱՍՑԵ</StyledTableCell>
        <StyledTableCell align="right">ՊԱՏՃԱՌԸ</StyledTableCell>
        <StyledTableCell align="right">ԳՐԱՆՑՈՂ</StyledTableCell>
        <StyledTableCell align="right">ԳՐԱՆՑՄԱՆ ա/թ</StyledTableCell>
        <StyledTableCell align="right">ՓՈՓՈԽՄԱՆ ա/թ</StyledTableCell>
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
