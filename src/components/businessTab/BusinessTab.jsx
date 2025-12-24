import { useMemo } from "react";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import useFetchCompanies from "../../hooks/useFetchCompanies";
import ListScileton from "../listSceleton/ListScileton";
import BusinessCard from "./BusinessCard";
import NoResults from "../NoResults/NoResults";
import PDFGenerator from "../PDFGenerator/PDFGenerator";
import BusinessReport from "../pdf-templates/BusinessReport";

const BusinessTab = ({ ssn }) => {
  const { data, isLoading, isError, error } = useFetchCompanies(ssn);
  const user = useAuthUser();

  if (isLoading) {
    return <ListScileton />;
  }
  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }
  const companies = Array.isArray(data?.companies) ? data.companies : [];
  const hasCompanies = companies.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return "";
    }
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  }, [user]);

  const exportFileName = useMemo(() => {
    const safeSsn = typeof ssn === "string" ? ssn.replace(/[^\w-]/g, "_") : "report";
    return `business_${safeSsn || "report"}.pdf`;
  }, [ssn]);

  const exportButton = hasCompanies ? (
    <PDFGenerator
      PDFTemplate={BusinessReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ PNum: ssn, companies }}
      userFullName={userFullName}
    />
  ) : null;

  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {exportButton && (
        <Stack direction="row" justifyContent="flex-end">
          {exportButton}
        </Stack>
      )}
      {hasCompanies ? (
        companies.map((company) => (
          <BusinessCard key={company.reg_num} company={company} />
        ))
      ) : (
        <NoResults />
      )}
    </Stack>
  );
};

export default BusinessTab;
