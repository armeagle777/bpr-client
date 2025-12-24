import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { TableChart as TableChartIcon, ViewModule as ViewModuleIcon } from '@mui/icons-material';
import { pageViewsMap } from '../RoadPoliceViolationsTab.constants';

const PageHeaderControls = ({ view, onChangeView, children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" alignItems="center" sx={{ mb: 3, mt: 3 }} justifyContent="space-between">
        {/* Title */}
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom sx={{ mb: 0 }}>
          Անձի ՃՈ Տուգանքների Տվյալներ
        </Typography>
        {children}
        {/* Toggle buttons */}
        <ToggleButtonGroup exclusive size="small" value={view} onChange={onChangeView}>
          <ToggleButton value={pageViewsMap.CARD}>
            <ViewModuleIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value={pageViewsMap.TABLE}>
            <TableChartIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </LocalizationProvider>
  );
};

export default PageHeaderControls;
