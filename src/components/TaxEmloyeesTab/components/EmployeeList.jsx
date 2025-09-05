import { Grid, Box } from "@mui/material";

import EmployeeCard from "./EmployeeCard";
import { memo } from "react";

const EmployeeList = ({ employees }) => {
  return (
    <Box sx={{ p: 3 }}>
      {!!employees?.length && (
        <Grid container spacing={3} justifyContent="center">
          {employees?.map((emp, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <EmployeeCard data={emp} key={i} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default memo(EmployeeList);
