import MuiAlert from "@mui/material/Alert";

import useFetchKadastr from "../../hooks/useFetchKadastr";
import DocumentNotFound from "./DocumentNotFound";
import ListScileton from "../listSceleton/ListScileton";
import PropertyInfo from "../../pages/KadastrCertificate/components/PropertyInfo";
import { Stack } from "@mui/material";

const Kadastr = ({ ssn }) => {
  const { data, isLoading, isError, error } = useFetchKadastr(ssn);

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

  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.length === 0 ? (
        <DocumentNotFound />
      ) : (
        data?.map((property, index) => (
          <PropertyInfo key={index} property={property} />
        ))
      )}
    </Stack>
  );
};

export default Kadastr;
