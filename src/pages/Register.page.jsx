import { useEffect } from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import useFetchBusiness from "../hooks/useFetchBusiness";
import RegisterHead from "../components/register/RegisterHead";
import RegisterBody from "../components/register/RegisterBody";

const Register = () => {
  const { taxId } = useParams();

  const {
    data,
    error,
    isError,
    isFetching,
    taxIdInputValue,
    handleSubmitSearch,
    setTaxIdInputValue,
  } = useFetchBusiness();

  useEffect(() => {
    if (taxId) {
      handleSubmitSearch(taxId);
    }
  }, [taxId]);

  return (
    <Container>
      <RegisterHead
        taxIdInputValue={taxIdInputValue}
        setTaxIdInputValue={setTaxIdInputValue}
      />
      <RegisterBody
        data={data}
        error={error}
        isError={isError}
        isFetching={isFetching}
      />
    </Container>
  );
};

export default Register;
