import { Grid } from "@mui/material";

import ViolationsCard from "./ViolationsCard";

const ViolationsCardList = ({ violations }) => {
  return (
    <Grid container spacing={2}>
      {violations.map((row, index) => {
        const speed = Number(row.rp_violation_speed || 0);
        const isHighSpeed = row.rp_violation_type === "speed" && speed > 60;
        return (
          <ViolationsCard row={row} isHighSpeed={isHighSpeed} key={index} />
        );
      })}
    </Grid>
  );
};

export default ViolationsCardList;
