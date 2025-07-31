import MuiAlert from "@mui/material/Alert";

import useFetchKadastr from "../../hooks/useFetchKadastr";
import DocumentNotFound from "./DocumentNotFound";
import ListScileton from "../listSceleton/ListScileton";
import KadastrDocument from "./KadastrDocument";
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
  const sortedData = data?.sort((a, b) => {
    // First, sort by cad_is_terminate (0 before 1)
    if (a.cad_is_terminate !== b.cad_is_terminate) {
      return a.cad_is_terminate - b.cad_is_terminate;
    }

    // Then, sort by cad_registration_date in descending order
    const dateA = new Date(a.cad_registration_date);
    const dateB = new Date(b.cad_registration_date);

    return dateB - dateA; // Sorting in descending order
  });
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {sortedData?.length === 0 ? (
        <DocumentNotFound />
      ) : (
        sortedData.map((property, index) => (
          <KadastrDocument
            key={index}
            property={property}
            isLoading={isLoading}
          />
        ))
      )}
    </Stack>
  );
};

export default Kadastr;
