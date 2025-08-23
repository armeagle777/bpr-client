import { TextField, Autocomplete, Grid, FormControl } from "@mui/material";

const FilterAutocomplete = ({ options, value, onChange, label }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          fullWidth
          options={options}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      </FormControl>
    </Grid>
  );
};

export default FilterAutocomplete;
