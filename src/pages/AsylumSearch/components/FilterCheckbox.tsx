import { Grid, Checkbox, FormControl, FormControlLabel } from "@mui/material";

const FilterCheckbox = ({ label, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <FormControl fullWidth>
        <FormControlLabel
          style={{ marginBottom: 4 }}
          label={label}
          labelPlacement="end"
          control={
            <Checkbox
              onChange={onChange}
              checked={Boolean(value)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 48 } }}
            />
          }
        />
      </FormControl>
    </Grid>
  );
};

export default FilterCheckbox;
