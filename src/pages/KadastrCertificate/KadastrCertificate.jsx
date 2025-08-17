import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { Header, Body } from "./components";
import useFetchKadastrCertificates from "../../hooks/useFetchKadastrCertificates";
import { SEARCH_BASES } from "./KadastrCertificate.constants";

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

  return (
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
  );
};

export default KadastrCertificate;
