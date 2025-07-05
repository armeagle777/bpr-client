import { TextField, Autocomplete, Grid, FormControl } from "@mui/material";

const FilterAutocomplete = ({ options, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          fullWidth
          options={options}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField {...params} label="Citizenship" />
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default FilterAutocomplete;
