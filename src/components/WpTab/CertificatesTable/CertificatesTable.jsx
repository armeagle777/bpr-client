import { Stack, Table, TableContainer, Paper, Typography } from "@mui/material";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const CertificatesTable = ({ cards }) => {
  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Typography variant="body2" component="span">
        Վկայականների պատմություն
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead />
          <TableBody rows={cards} />
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default CertificatesTable;
