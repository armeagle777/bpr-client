import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  TableRow as MuiTableRow,
} from '@mui/material';
import { CustomTableRow } from './components';
import { useState } from 'react';

const MuiTable = ({ rows, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const visibleCols = columns?.filter((c) => !c.hiddenInMain);

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible weapons table">
          <TableHead>
            <MuiTableRow>
              <TableCell />
              {visibleCols.map((col) => (
                <TableCell key={col.key}>{col?.title}</TableCell>
              ))}
            </MuiTableRow>
          </TableHead>
          <TableBody>
            {paginatedRows?.map((row, i) => (
              <CustomTableRow key={i} row={row} columns={columns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Տողերի քանակ"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} / ${count !== -1 ? count : `ավելի քան ${to}`}`
        }
      />
    </Paper>
  );
};

export default MuiTable;
