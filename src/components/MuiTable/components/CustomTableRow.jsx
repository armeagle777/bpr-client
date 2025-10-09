import { useState } from 'react';
import {
  Box,
  Table,
  Collapse,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableRow,
} from '@mui/material';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';

const CustomTableRow = ({ row, columns }) => {
  const [open, setOpen] = useState(false);

  // Split visible/hidden columns
  const visibleCols = columns?.filter((c) => !c.hiddenInMain);
  const hiddenCols = columns?.filter((c) => c.hiddenInMain);

  return (
    <>
      {/* Main row */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)} aria-label="expand row">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {visibleCols?.map((col) => (
          <TableCell key={col.key}>{col.render ? col.render(row) : row[col.key] || '-'}</TableCell>
        ))}
      </TableRow>

      {/* Collapsible row */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns?.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Լրացուցիչ տվյալներ
              </Typography>

              <Table size="small" aria-label="details">
                <TableBody>
                  {hiddenCols?.map((col) => (
                    <TableRow key={col.key}>
                      <TableCell sx={{ fontWeight: 600 }}>{col.title}</TableCell>
                      <TableCell>{col.render ? col.render(row) : row[col.key] || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomTableRow;
