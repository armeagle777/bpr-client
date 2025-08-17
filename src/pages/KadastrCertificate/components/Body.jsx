import MuiAlert from "@mui/material/Alert";

import PropertyInfo from "./PropertyInfo";

const Body = ({ data, isLoading, isFetching, isError, error }) => {
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
