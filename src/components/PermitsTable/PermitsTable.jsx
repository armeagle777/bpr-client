import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { getSortedByDateFIeld } from "../../utils/helperFunctions";

const PermitsTable = ({ title = "", data }) => {
  const sortedPermits = getSortedByDateFIeld(data, "cardIssued");

  const columns = ["Տեսակը", "Քարտի N", "Տրման ա/թ", "Վավեր է", "Կարգավիճակ"];

  const enrichedRows =
    sortedPermits?.map((row, index) => ({
      key: index + 1,
      ...row,
    })) || [];

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Typography variant="body2" component="span">
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead columns={columns} />
          <TableBody rows={enrichedRows} />
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default PermitsTable;
