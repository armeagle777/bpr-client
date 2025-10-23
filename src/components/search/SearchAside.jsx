import { useState, useMemo } from "react";
import { Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";

import Checkbox from "../checkbox/Checkbox";

const SearchAside = ({
  showExtended,
  persons,
  setFilters,
  filters,
  filterCounts,
  disabled,
}) => {

  const onAgeChange = (event) => {
    const ageFilterOptions = { ageFrom: 'min', ageTo: 'max' };
    const { name, value } = event.target;
    const newValue = Math.max(Number(value), 0);
    setFilters({
      ...filters,
      age: { ...filters.age, [ageFilterOptions[name]]: newValue },
    });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value.trim().toUpperCase() });
  };

  return (
    <Stack sx={{ width: "15%" }}>
      {showExtended && (
        <>
          {/* Age Range Filter */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Տարիքը</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                backgroundColor: '#fafafa',
              }}
            >
              <TextField
                id="ageFrom"
                type="number"
                name="ageFrom"
                label="Տարիքից"
                onChange={onAgeChange}
                value={filters.age?.min || ''}
                size="small"
                sx={{ width: '80px' }}
                inputProps={{ min: 0, max: 120 }}
                disabled={disabled}
              />
              <Box sx={{ color: '#666', fontSize: '14px' }}>մինչև</Box>
              <TextField
                label="Տարիքը"
                id="ageTo"
                name="ageTo"
                type="number"
                onChange={onAgeChange}
                value={filters.age?.max || ''}
                size="small"
                sx={{ width: '80px' }}
                inputProps={{ min: 0, max: 120 }}
                disabled={disabled}
              />
            </Box>
          </Box>

          {/* Gender Filter */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Սեռը</Typography>
            <FormControl size="small" fullWidth>
              <InputLabel id="gender-label">Սեռ</InputLabel>
              <Select
                label="Սեռ"
                id="gender"
                name="gender"
                labelId="gender-label"
                onChange={onInputChange}
                value={filters?.gender || ''}
                disabled={disabled}
              >
                <MenuItem value="">-Բոլորը-</MenuItem>
                <MenuItem value="MALE">Արական</MenuItem>
                <MenuItem value="FEMALE">Իգական</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Մարզ</Typography>
            <FormGroup>
              <Checkbox label="Երևան" disabled={disabled} />
              <Checkbox label="Արագածոտն" disabled={disabled} />
              <Checkbox label="Արարատ" disabled={disabled} />
              <Checkbox label="Արմավիր" disabled={disabled} />
              <Checkbox label="Գեղարքունիք" disabled={disabled} />
              <Checkbox label="Կոտայք" disabled={disabled} />
              <Checkbox label="Լոռի" disabled={disabled} />
              <Checkbox label="Շիրակ" disabled={disabled} />
              <Checkbox label="Սյունիք" disabled={disabled} />
              <Checkbox label="Տավուշ" disabled={disabled} />
              <Checkbox label="Վայոց ձոր" disabled={disabled} />
              <Checkbox label="Անհայտ" disabled={disabled} />
            </FormGroup>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default SearchAside;
