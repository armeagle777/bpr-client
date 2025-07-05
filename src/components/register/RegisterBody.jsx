import MuiAlert from "@mui/material/Alert";

import { useCompanies } from "../context/companies";
import CompanyInfo from "./CompanyInfo";

const RegisterBody = () => {
  const { data, isFetching, isError, error } = useCompanies();

  if (isFetching) {
    return "Loading...";
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
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
