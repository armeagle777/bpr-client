import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const FilterSelect = ({ label, value, onChange, options }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default FilterSelect;
