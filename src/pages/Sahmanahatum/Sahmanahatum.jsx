import { Container } from "@mui/material";

import SahmanahatumHead from "./SahmanahatumHead";
import SahmanahatumBody from "./SahmanahatumBody";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBordercrossDataBySsn } from "../../api/personsApi";

const Sahmanahatum = () => {
  const [passportInput, setPassportInput] = useState("");
  const [country, setCountry] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const { isFetching, isLoading, isError, error, data } = useQuery(
    ["sahmanahatum", searchParams],
    () => getBordercrossDataBySsn(searchParams),
    {
      keepPreviousData: true,
      enabled: !!searchParams,
    }
  );

  const isFormValid = !!passportInput && !!country;

  const handleCountriesChange = (event, value, details) => {
    setCountry(value);
  };

  const handleSearchSubmit = () => {
    if (!isFormValid) return;
    setSearchParams({
      passportNumber: passportInput,
      citizenship: country?.alpha_3,
    });
  };

  return (
    <Container>
      <SahmanahatumHead
        passportInput={passportInput}
        setPassportInput={setPassportInput}
        onSearchSubmit={handleSearchSubmit}
        onCountriesChange={handleCountriesChange}
        searchBtnDisabled={!isFormValid}
      />
      <SahmanahatumBody data={data} />
    </Container>
  );
};

export default Sahmanahatum;
