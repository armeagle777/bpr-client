import { Grid } from "@mui/material";

import EmployerCard from "./EmployerCard";

const EmployerList = ({ data }) => {
  return (
    <Grid container spacing={3}>
      {data?.map((employer, idx) => (
        <EmployerCard employer={employer} key={idx} />
      ))}
    </Grid>
  );
};

export default EmployerList;
