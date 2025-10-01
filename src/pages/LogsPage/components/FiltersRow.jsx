import { Box, TextField, Autocomplete } from "@mui/material";
import ExportExcelButton from "../../../components/ExportExcelButton/ExportExcelButton";

const FiltersRow = ({
  filters,
  usersLoading,
  usersOptions,
  logTypeOptions,
  logTypesLoading,
  onUsersSelect,
  onLogTypesSelect,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
        gap: 2,
        mb: 3,
      }}
    >
      {/* Users filter */}
      <Autocomplete
        loading={usersLoading}
        options={usersOptions}
        value={filters.user}
        onChange={(_, value) => onUsersSelect(value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label || ""}
        renderInput={(params) => (
          <TextField {...params} label="Օգտատերեր" size="small" />
        )}
      />

      {/* LogTypes filter */}
      <Autocomplete
        options={logTypeOptions}
        loading={logTypesLoading}
        value={filters.logType}
        onChange={(_, value) => onLogTypesSelect(value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label || ""}
        renderInput={(params) => (
          <TextField {...params} label="Լոգի տեսակ" size="small" />
        )}
      />
      <ExportExcelButton filters={filters} />
    </Box>
  );
};

export default FiltersRow;
