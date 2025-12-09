import { useMemo } from "react";
import MuiAlert from "@mui/material/Alert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Stack } from "@mui/material";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import useFetchKadastr from "../../hooks/useFetchKadastr";
import NoResults from "../NoResults/NoResults";
import ListScileton from "../listSceleton/ListScileton";
import PropertyInfo from "../../pages/KadastrCertificate/components/PropertyInfo";
import PDFGenerator from "../PDFGenerator/PDFGenerator";
import KadastrReport from "../pdf-templates/KadastrReport";

const Kadastr = ({ ssn }) => {
  const { data, isLoading, isError, error } = useFetchKadastr(ssn);
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

  const properties = Array.isArray(data) ? data : [];
  const hasProperties = properties.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return "";
    }
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  }, [user]);

  const exportFileName = useMemo(() => {
    const safeSsn = typeof ssn === "string" ? ssn.replace(/[^\w-]/g, "_") : "report";
    return `kadastr_${safeSsn || "report"}.pdf`;
  }, [ssn]);

  const exportButton = hasProperties ? (
    <PDFGenerator
      PDFTemplate={KadastrReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ PNum: ssn, properties }}
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
      {hasProperties ? (
        properties.map((property, index) => (
          <PropertyInfo key={index} property={property} />
        ))
      ) : (
        <NoResults />
      )}
    </Stack>
  );
};

export default Kadastr;
