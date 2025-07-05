import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const TableHead = ({ columns }) => {
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
        {columns?.map((columnName, index) => (
          <StyledTableCell key={index} align="center">
            {columnName}
          </StyledTableCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default TableHead;
