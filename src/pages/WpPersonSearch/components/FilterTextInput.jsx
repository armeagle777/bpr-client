import { Grid, TextField } from "@mui/material";

const FilterTextInput = ({ value, onChange, label }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <TextField
        fullWidth
        label={label}
        value={value}
        variant="outlined"
        type="search"
        onChange={(e) => onChange(e.target.value)}
      />
    </Grid>
  );
};

export default FilterTextInput;
