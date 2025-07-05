import {
  Select,
  Checkbox,
  MenuItem,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

import { formatCzReportDocsOptionText, isDocChecked } from "./helpers";

const CzOrderDocsDropdown = ({ value, onChange, documents }) => {
  const renderValue = (selected) =>
    selected?.map((doc) => doc.Document_Number)?.join(", ");
  return (
    <Select
      fullWidth
      multiple
      id="Փաստաթուղթ"
      value={value}
      onChange={onChange}
      placeholder="Փաստաթուղթ"
      aria-label="Փաստաթուղթ"
      label="Փաստաթուղթ"
      input={<OutlinedInput label="Tag" />}
      renderValue={renderValue}
      style={{ minWidth: 200 }}
    >
      {documents?.map((passport, index) => {
        const optionText = formatCzReportDocsOptionText(passport);
        const isChecked = isDocChecked(value, passport);
        return (
          <MenuItem key={passport.Document_Number} value={passport}>
            <Checkbox checked={isChecked} />
            <ListItemText primary={optionText} />
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default CzOrderDocsDropdown;
