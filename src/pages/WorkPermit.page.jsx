import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Aside from "../components/Workpermit/Aside";

const WorkPermit = () => {
  return (
    <Grid container spacing={2} className="workpermit-container">
      <Grid item xs={12} md={4} lg={2}>
        <Aside />
      </Grid>
      <Grid item xs={12} md={8} lg={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default WorkPermit;
