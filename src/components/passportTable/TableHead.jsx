import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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
                <StyledTableCell align='left'>...</StyledTableCell>
                <StyledTableCell>ԱԱՀ</StyledTableCell>
                <StyledTableCell align='right'>ՏԵՍԱԿ</StyledTableCell>
                <StyledTableCell align='right'>ՓԱՍՏԱԹՂԹԻ N</StyledTableCell>
                <StyledTableCell align='right'>ՏՐՎԵԼ Է</StyledTableCell>
                <StyledTableCell align='right'>ԿՈՂՄԻՑ</StyledTableCell>
                <StyledTableCell align='right'>ՎԱՎԵՐ Է</StyledTableCell>
            </MuiTableRow>
        </MuiTableHead>
    );
};

export default TableHead;
