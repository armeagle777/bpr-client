import { useState, useMemo } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

import Checkbox from "../checkbox/Checkbox";

const minDistance = 10;

const SearchAside = ({
  showExtended,
  persons,
  setFilters,
  filters,
  filterCounts,
  disabled,
}) => {
  const [value, setValue] = useState([20, 37]);

  const {
    gender: { maleCount, femaleCount },
    age,
  } = { ...filterCounts };

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setFilters((prev) => ({
        ...prev,
        age: {
          min: Math.min(newValue[0], prev.age.max - minDistance),
          max: prev.age.max,
        },
      }));
      // setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setFilters((prev) => ({
        ...prev,
        age: {
          min: prev.age.min,
          max: Math.max(newValue[1], prev.age.min + minDistance),
        },
      }));
      // setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const valuetext = (value) => {
    return `${value}°C`;
  };

  return (
    <Stack sx={{ width: "15%" }}>
      {showExtended && (
        <>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Տարիքը</Typography>
            <Slider
              disabled={disabled}
              getAriaLabel={() => "Age range"}
              value={[filters.age.min, filters.age.max]}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Սեռը</Typography>
            <FormGroup>
              <Checkbox
                disabled={disabled || !maleCount}
                checked={!!filters.gender.male}
                label={`Արական (${maleCount})`}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    gender: { ...prev.gender, male: Number(!prev.gender.male) },
                  }))
                }
              />
              <Checkbox
                disabled={disabled || !femaleCount}
                checked={!!filters.gender.female}
                label={`Իգական (${femaleCount})`}
                onChange={() => {
                  setFilters((prev) => ({
                    ...prev,
                    gender: {
                      ...prev.gender,
                      female: Number(!prev.gender.female),
                    },
                  }));
                }}
              />
            </FormGroup>
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
