import { Grid } from "@mui/material";

import EmployerCard from "./EmployerCard";

const EmployerList = ({ data }) => {
  return (
    <Grid container spacing={3}>
      {/* TODO Add start and end dates filters */}
      {data?.map((employer, idx) => (
        <EmployerCard employer={employer} key={idx} />
      ))}
    </Grid>
  );
};

export default EmployerList;
