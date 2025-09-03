import {
  Box,
  Card,
  Grid,
  Alert,
  Divider,
  Typography,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import NoResults from "../NoResults/NoResults";
import DataLoader from "../DataLoader/DataLoader";
import { columns } from "./TaxObligationsTab.constants";
import useFetchCompanyObligations from "../../hooks/useFetchCompanyObligations";

const TaxObligationsTab = ({ tin }) => {
  const { data, isError, error, isFetching } = useFetchCompanyObligations(tin);

  if (isFetching) {
    return <DataLoader />;
  }

  if (isError) {
    return (
      <Alert severity="error">{error?.message || "Սխալ է տեղի ունեցել:"}</Alert>
    );
  }

  if (data === null) {
    return <NoResults />;
  }

  const { taxInfo, declInfo, taxPayerInfo, singleAccountPayments } = data || {};
  const rowsWithKeys = taxInfo?.taxTypeList?.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Box sx={{ p: 2 }}>
      {/* Taxpayer Info */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            Հարկ վճարող
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Անուն:
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {taxPayerInfo.taxpayerName}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            ՀՎՀՀ:
          </Typography>
          <Typography variant="body1">{taxPayerInfo.tin}</Typography>
        </CardContent>
      </Card>

      {/* Balances */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="secondary" gutterBottom>
                Ընդհանուր մնացորդ
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {Number(taxInfo.totalBalance).toLocaleString()} ֏
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Վերջին թարմացում՝ {taxInfo.responseDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="secondary" gutterBottom>
                Մեկ միասնական հաշվից
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {Number(taxInfo.singleAccountBalance).toLocaleString()} ֏
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tax Types Table */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Հարկերի տեսակներ
          </Typography>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableRowSelectionOnClick
            />
          </div>
        </CardContent>
      </Card>

      {/* Declaration Info */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Հայտարարագրային տվյալներ
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">ԱԱՀ</Typography>
              <Typography variant="body1">{declInfo.vatTaxDeclInfo}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Շրջանառության հարկ</Typography>
              <Typography variant="body1">
                {declInfo.turnoverTaxDeclInfo}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                Ընդհանուր շրջանառություն
              </Typography>
              <Typography variant="body1">
                {declInfo.totalTurnoverActivitiesDeclInfo}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Շահութահարկ</Typography>
              <Typography variant="body1">
                {declInfo.profitTaxDeclInfo.profitForReportingPeriod}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Payments */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Վճարումներ
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ընդամենը վճարված՝{" "}
            {Number(singleAccountPayments.amount).toLocaleString()} ֏
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleAccountPayments.fromDate} → {singleAccountPayments.toDate}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaxObligationsTab;
