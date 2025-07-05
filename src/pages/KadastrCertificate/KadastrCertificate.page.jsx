import { Container } from "@mui/material";

import { Header, Body } from "./components";

const KadastrCertificate = () => {
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const trimedString = searchString.trim();
  //     const searchParamsObj = createSearchParamsObject(trimedString);

  //     setSearchParams(searchParamsObj);

  // };

  return (
    <Container>
      <Header />
      <Body />
    </Container>
  );
};

export default KadastrCertificate;
