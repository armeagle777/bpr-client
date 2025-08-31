import {
  Box,
  Card,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardContent,
} from "@mui/material";

const PhysicalPropertyCard = ({ item }) => {
  return (
    <Box mb={3}>
      <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            🏠 Գույքի Տեսակը:{" "}
            {item?.physical_real_estate_service?.property_type || ""}
          </Typography>
          <Typography variant="body2">
            Կադաստրային գաղտնագիր:{" "}
            {item?.physical_real_estate_service?.property_cadaster_password ||
              ""}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {item.physical_real_estate_persons?.map((person, pIdx) => (
            <Box key={pIdx} mb={3}>
              <Typography variant="subtitle1" gutterBottom>
                👤 {person.mta_get_taxes_last_name || ""}{" "}
                {person.mta_get_taxes_first_name || ""}
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Տարի</TableCell>
                    <TableCell align="right">Հարկ (֏)</TableCell>
                    <TableCell align="right">Տուգանք (֏)</TableCell>
                    <TableCell align="right">Պարտք (֏)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {person.physical_real_estate_taxes?.map((t, tIdx) => (
                    <TableRow key={tIdx}>
                      <TableCell>{t.year || ""}</TableCell>
                      <TableCell align="right">
                        {t.physical_real_estate_tax_item?.amount ?? "-"}
                      </TableCell>
                      <TableCell align="right">
                        {t.physical_real_estate_penalty?.amount ?? "-"}
                      </TableCell>
                      <TableCell align="right">
                        {t.physical_real_estate_tax_item?.debt ?? "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PhysicalPropertyCard;
