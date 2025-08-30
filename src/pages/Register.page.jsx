import { Container } from "@mui/material";

import RegisterHead from "../components/register/RegisterHead";
import RegisterBody from "../components/register/RegisterBody";

const Register = () => {
  const {
    data,
    error,
    isError,
    isFetching,
    taxIdInputValue,
    handleSubmitSearch,
    setTaxIdInputValue,
  } = useFetchBusiness();

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
