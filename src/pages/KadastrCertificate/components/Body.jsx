import MuiAlert from "@mui/material/Alert";

import PropertyInfo from "./PropertyInfo";
import DataLoader from "../../../components/DataLoader/DataLoader";

const Body = ({ data, isLoading, isFetching, isError, error }) => {
  if (isFetching) {
    return <DataLoader />;
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
