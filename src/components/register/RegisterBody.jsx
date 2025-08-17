import { Alert as MuiAlert } from "@mui/material";

import CompanyInfo from "./CompanyInfo";
import DataLoader from "../DataLoader/DataLoader";

const RegisterBody = ({ isError, error, data, isFetching }) => {
  if (isFetching) {
    return <DataLoader />;
  }
  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }
  if (!data || (Array.isArray(data) && !data.length)) return null;
  return (
    <div>
      {((Array.isArray(data) && !!data.length) || data) && (
        <CompanyInfo company={data} />
      )}
    </div>
  );
};

export default RegisterBody;
