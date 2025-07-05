import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";

const Checkbox = ({ label, onChange, checked, disabled }) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
      }
      label={label}
      sx={{ height: "30px" }}
    />
  );
};

export default Checkbox;
