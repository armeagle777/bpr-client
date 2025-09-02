import {
  Card,
  Paper,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardContent,
  TableContainer,
} from "@mui/material";

const FinanceCard = ({ employer }) => {
  const periods = employer.personInfoPeriods?.personInfoPeriod || [];

  // Calculate totals
  const totals = periods.reduce(
    (acc, { personInfo }) => {
      Object.keys(acc).forEach((k) => (acc[k] += personInfo[k] || 0));
      return acc;
    },
    {
      incomeTax: 0,
      workinghours: 0,
      socialpayments: 0,
      socialpaymentspaid: 0,
      salaryEquivPayments: 0,
      civilLowContractPayments: 0,
    }
  );
  return (
    <Card
      key={idx}
      variant="outlined"
      sx={{ borderRadius: 3, boxShadow: 3, mb: 4 }}
    >
      <CardContent>
        {/* Employer Header */}
        <Typography variant="h6" gutterBottom>
          {employer.taxpayerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ՀՎՀՀ: {employer.taxpayerid} | Տեսակ: {employer.legalTypeName} (
          {employer.legalTypeCode})
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Data Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ամիս</TableCell>
                <TableCell align="right">Եկամտային հարկ</TableCell>
                <TableCell align="right">Աշխ. ժամեր</TableCell>
                <TableCell align="right">Սոց. վճար</TableCell>
                <TableCell align="right">Վճարված</TableCell>
                <TableCell align="right">Աշխ.ավտ. վճար</TableCell>
                <TableCell align="right">Քաղաքացիական պայմանագիր</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {periods.map(({ date, personInfo }, i) => (
                <TableRow
                  key={i}
                  sx={{
                    backgroundColor:
                      personInfo.salaryEquivPayments === 0
                        ? "#fff5f5"
                        : "inherit",
                  }}
                >
                  <TableCell>{date}</TableCell>
                  <TableCell align="right">{personInfo.incomeTax}</TableCell>
                  <TableCell align="right">{personInfo.workinghours}</TableCell>
                  <TableCell align="right">
                    {personInfo.socialpayments}
                  </TableCell>
                  <TableCell align="right">
                    {personInfo.socialpaymentspaid}
                  </TableCell>
                  <TableCell align="right">
                    {personInfo.salaryEquivPayments}
                  </TableCell>
                  <TableCell align="right">
                    {personInfo.civilLowContractPayments}
                  </TableCell>
                </TableRow>
              ))}

              {/* Totals Row */}
              <TableRow sx={{ backgroundColor: "#f0f7ff", fontWeight: "bold" }}>
                <TableCell>Ընդամենը</TableCell>
                <TableCell align="right">{totals.incomeTax}</TableCell>
                <TableCell align="right">{totals.workinghours}</TableCell>
                <TableCell align="right">{totals.socialpayments}</TableCell>
                <TableCell align="right">{totals.socialpaymentspaid}</TableCell>
                <TableCell align="right">
                  {totals.salaryEquivPayments}
                </TableCell>
                <TableCell align="right">
                  {totals.civilLowContractPayments}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default FinanceCard;
