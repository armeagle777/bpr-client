import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { getSortedByDateFIeld } from "../../utils/helperFunctions";

const BordercrossTable = ({ title = "", data }) => {
  const sortedData = getSortedByDateFIeld(data, "datetime");
  const columns = [
    "ԱԱՀ",
    "Անձնագիր",
    "Ծննդ։ ա/թ",
    "Անցման ա/թ",
    "Ուղղություն",
    "Կարգավիճակ",
  ];

  const enrichedRows =
    sortedData?.map((row, index) => ({
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

export default BordercrossTable;
