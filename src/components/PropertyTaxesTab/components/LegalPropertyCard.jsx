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
import { formatAmount } from "../../../utils/helperFunctions";

const LegalPropertyCard = ({ item }) => {
  return (
    <Box mb={3}>
      <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          {/* Service info */}
          <Typography variant="h6" gutterBottom color="primary">
            🏢 Գույքի Տեսակը:{" "}
            {item?.legal_real_estate_service?.property_type || ""}
          </Typography>
          <Typography variant="body2">
            Կառույցի Կադաստրային ծածկագիր:{" "}
            {item?.legal_real_estate_service?.property_cadaster_password || ""}
          </Typography>
          <Typography variant="body2">
            Հողի Կադաստրային ծածկագիր:{" "}
            {item?.legal_real_estate_service?.land_cadaster_password || ""}
          </Typography>
          <Typography variant="body2">
            Հողի օգտագործման նպատակ:{" "}
            {item?.legal_real_estate_service?.land_type || ""}
          </Typography>
          <Typography variant="body2">
            Սեփականության մեկնարկի օրը:{" "}
            {item?.legal_real_estate_service?.start_date || ""}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Persons */}
          {item.legal_real_estate_persons?.map((person, pIdx) => (
            <Box key={pIdx} mb={3}>
              <Typography variant="subtitle1" gutterBottom>
                👤 {person.organization_name || ""} ({person.person_type})
              </Typography>

              <Typography variant="body2">ՀՎՀՀ: {person.tax_id}</Typography>
              <Typography variant="body2">
                Պետ. Գրանցման համար: {person.reg_num}
              </Typography>
              <Typography variant="body2">
                Սեփականատիրոջ տեսակ: {person.person_type}
              </Typography>
              <Typography variant="body2">
                Վճարման հաշվեհամար: {person.account_number}
              </Typography>
              <Typography variant="body2">
                Վճարման ամսաթիվ: {person.calculation_date}
              </Typography>
              {person.share && (
                <Typography variant="body2">Բաժին: {person.share}</Typography>
              )}

              <Table size="small" sx={{ mt: 1 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Տարի</TableCell>
                    <TableCell align="right">Գույքահարկ (֏)</TableCell>
                    <TableCell align="right">Գույքահարկի Պարտք (֏)</TableCell>
                    <TableCell align="right">Տույժ (֏)</TableCell>
                    <TableCell align="right">Տույժի Պարտք (֏)</TableCell>
                    <TableCell align="right">Գերավճար (֏)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {person.legal_real_estate_taxes?.map((t, tIdx) => (
                    <TableRow key={tIdx}>
                      <TableCell>{t.year || ""}</TableCell>
                      <TableCell align="right">
                        {t.legal_real_estate_tax_item?.amount
                          ? formatAmount(t.legal_real_estate_tax_item.amount)
                          : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {t.legal_real_estate_tax_item?.debt
                          ? formatAmount(t.legal_real_estate_tax_item.debt)
                          : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {t.legal_real_estate_penalty?.amount
                          ? formatAmount(t.legal_real_estate_penalty.amount)
                          : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {t.legal_real_estate_penalty?.debt
                          ? formatAmount(t.legal_real_estate_penalty.debt)
                          : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {t.overpay ? formatAmount(t.overpay) : "-"}
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

export default LegalPropertyCard;
