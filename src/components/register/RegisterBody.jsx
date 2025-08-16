import { Alert as MuiAlert } from "@mui/material";

import CompanyInfo from "./CompanyInfo";

const RegisterBody = ({ isError, error, data, isFetching }) => {
  if (isFetching) {
    return "Loading...";
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
