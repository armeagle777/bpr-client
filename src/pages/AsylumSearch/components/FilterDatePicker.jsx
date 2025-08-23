import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const FilterDatePicker = ({ label, value, onChange, maxDate, minDate }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <DatePicker
        label={label}
        disableFuture
        maxDate={maxDate}
        minDate={minDate}
        onChange={onChange}
        format="DD/MM/YYYY"
        slotProps={{ textField: { fullWidth: true } }}
        value={value ? dayjs(value, "DD/MM/YYYY") : null}
        renderInput={(params) => <TextField {...params} />}
      />
    </Grid>
  );
};

export default FilterDatePicker;
