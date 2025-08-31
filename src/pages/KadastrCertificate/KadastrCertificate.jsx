import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Map as MapIcon } from "@mui/icons-material";

import { Header, Body } from "./components";
import { SEARCH_BASES } from "./KadastrCertificate.constants";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import useFetchKadastrCertificates from "../../hooks/useFetchKadastrCertificates";

const KadastrCertificate = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const search_base = searchParams.get("search_base");

  const [searchBase, setSearchBase] = useState(search_base || "CERT_NUMBER");

  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
  } = useFetchKadastrCertificates();

  useEffect(() => {
    if (q) {
      handleSubmitSearch(q, SEARCH_BASES[searchBase]);
    }
  }, [q]);

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
    }
  };

  const breadCrumbItems = [
    { label: "Կադաստրի Տվյալների Որոնում", Icon: MapIcon },
  ];

  return (
    <Box p={3}>
      <BreadCrumb items={breadCrumbItems} />
      <Container>
        <Header
          isLoading={isLoading}
          searchBase={searchBase}
          isFetching={isFetching}
          certNumberInput={certNumberInput}
          handleBaseChange={handleBaseChange}
          setCertNumberInput={setCertNumberInput}
          handleSubmitSearch={handleSubmitSearch}
        />
        <Body
          data={data}
          error={error}
          isError={isError}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </Container>
    </Box>
  );
};

export default KadastrCertificate;
