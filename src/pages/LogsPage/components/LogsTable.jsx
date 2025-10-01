import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import LogTableRow from "./LogTableRow";

const LogsTable = ({ logs }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Օգտատեր</TableCell>
            <TableCell>Ստեղծման ա/թ</TableCell>
            <TableCell>Տիպը</TableCell>
            <TableCell>Տվյալները</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log, idx) => (
            <LogTableRow key={idx} log={log} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
