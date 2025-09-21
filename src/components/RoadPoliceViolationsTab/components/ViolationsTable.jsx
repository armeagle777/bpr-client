import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import ViolationsTableRow from "./ViolationsTableRow";

const ViolationsTable = ({ violations }) => {
  return (
    <Card sx={{ boxShadow: 4 }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Տեսակ</TableCell>
              <TableCell>Աղմուկ / Խաչ</TableCell>
              <TableCell>Ժամանակ</TableCell>
              <TableCell align="right">Վճարվելիք</TableCell>
              <TableCell align="right">Տուգանք</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {violations.map((row) => (
              <ViolationsTableRow row={row} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ViolationsTable;
