import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

const PassportTable = ({ documents }) => {
  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Typography variant="body2" component="span">
        Փաստաթղթեր
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead />
          <TableBody rows={documents} />
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default PassportTable;
