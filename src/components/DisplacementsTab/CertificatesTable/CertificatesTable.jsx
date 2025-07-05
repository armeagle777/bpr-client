import { Stack, Table, TableContainer, Paper } from "@mui/material";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const CertificatesTable = ({ cases }) => {
  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead />
          <TableBody rows={cases} />
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default CertificatesTable;
