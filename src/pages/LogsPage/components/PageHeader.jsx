import {
  TableChart as TableChartIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const PageHeader = ({ onViewChange, view }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Typography variant="h5" color="primary" fontWeight="bold">
        Պահպանված լոգեր
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={onViewChange}
        size="small"
        color="primary"
      >
        <ToggleButton value="cards">
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton value="table">
          <TableChartIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default PageHeader;
