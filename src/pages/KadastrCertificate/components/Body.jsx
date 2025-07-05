import MuiAlert from "@mui/material/Alert";

import { useKadastrCerts } from "../../../components/context/kadastrCerts";
import PropertyInfo from "./PropertyInfo";

const Body = () => {
  const { data, isLoading, isFetching, isError, error } = useKadastrCerts();

  if (isFetching) {
    return "Loading...";
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }
  return (
    <div>
      {!!data?.length &&
        data.map((property, index) => (
          <PropertyInfo key={index} property={property} />
        ))}
    </div>
  );
};

export default Body;
