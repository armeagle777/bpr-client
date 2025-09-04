import { Grid, Box, Typography } from "@mui/material";

import NoResults from "../../NoResults/NoResults";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({ employees }) => {
  return (
    <Box sx={{ p: 3 }}>
      {/* {employees === null && <NoResults />} */}

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

export default EmployeeList;
