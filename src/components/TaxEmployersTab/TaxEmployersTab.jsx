import { Alert as MuiAlert, Stack, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import NoResults from "../NoResults/NoResults";
import DataLoader from "../DataLoader/DataLoader";
import useFetchPersonEmployers from "../../hooks/useFetchPersonEmployers";
import EmployerList from "./components/EmployerList";
import PDFGenerator from "../PDFGenerator/PDFGenerator";
import TaxEmployersReport from "../pdf-templates/TaxEmployersReport";

const TaxEmployersTab = ({ ssn }) => {
  const { data, isFetching, isError, error } = useFetchPersonEmployers(ssn);
  const user = useAuthUser();

  const safeSsn = typeof ssn === "string" ? ssn.replace(/[^\w-]/g, "_") : "report";
  const userFullName = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") : "";
  const exportFileName = `tax_employers_${safeSsn || "report"}.pdf`;

  if (data && !data?.length) return <NoResults />;

  if (isFetching) return <DataLoader />;

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  const exportButton =
    data?.length > 0 ? (
      <PDFGenerator
        PDFTemplate={TaxEmployersReport}
        fileName={exportFileName}
        buttonText="Արտահանել"
        variant="outlined"
        Icon={PictureAsPdfIcon}
        data={{ PNum: ssn, employers: data }}
        userFullName={userFullName}
      />
    ) : null;

  return (
    <>
      {exportButton && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" color="primary" fontWeight="bold">
            Գործատուներ
          </Typography>
          {exportButton}
        </Stack>
      )}
      <EmployerList data={data} />
    </>
  );
};

export default TaxEmployersTab;
