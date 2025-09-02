import {
  Box,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TableChartIcon from "@mui/icons-material/TableChart";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { pageViewsMap } from "../Finances.constants";

const PageHeaderControls = ({
  view,
  endDate,
  startDate,
  setEndDate,
  setStartDate,
  onChangeView,
}) => {
  return (
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

      {/* Date pickers */}
      <Box display="flex" gap={2} alignItems="center">
        <DatePicker
          label="Սկիզբ"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
        <DatePicker
          label="Վերջ"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </Box>

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
  );
};

export default PageHeaderControls;
