import {
  Box,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import TableChartIcon from "@mui/icons-material/TableChart";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { pageViewsMap } from "../Finances.constants";

import FilterDatePicker from "./FilterDatePicker";

const PageHeaderControls = ({
  view,
  endDate,
  startDate,
  onDateChange,
  onChangeView,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        alignItems="center"
        sx={{ mb: 3, mt: 3 }}
        justifyContent="space-between"
      >
        {/* Title */}
        <Typography
          variant="h5"
          color="primary"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 0 }}
        >
          Անձի Եկամուտների Տվյալներ
        </Typography>

        {/* Toggle buttons */}
        <ToggleButtonGroup
          exclusive
          size="small"
          value={view}
          onChange={onChangeView}
        >
          <ToggleButton value={pageViewsMap.TABLE}>
            <TableChartIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value={pageViewsMap.CARD}>
            <ViewModuleIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </LocalizationProvider>
  );
};

export default PageHeaderControls;
