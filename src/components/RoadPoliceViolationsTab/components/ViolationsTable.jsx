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
              <TableCell align="center">Տ/Մ</TableCell>
              <TableCell align="center">Սեփականատեր</TableCell>
              <TableCell>Խախտման տեսակ</TableCell>
              <TableCell>Ա/թ</TableCell>
              <TableCell align="right">Վճարվելիք</TableCell>
              <TableCell align="right">Տուգանք</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {violations.map((row, index) => (
              <ViolationsTableRow row={row} key={index} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ViolationsTable;
