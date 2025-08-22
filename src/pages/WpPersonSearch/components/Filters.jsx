import dayjs from "dayjs";
import { memo, useMemo } from "react";
import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import useCountriesData from "../../../hooks/useCountriesData";
import FilterDatePicker from "./FilterDatePicker";
import FilterSelect from "./FilterSelect";
import FilterTextInput from "./FilterTextInput";
import { genderOptions, procedureOptions } from "../constants";
import FilterAutocomplete from "./FilterAutocomplete";

const Filters = ({
  filters,
  isFetching,
  handleReset,
  handleChange,
  handleSubmit,
  isFiltersChanged,
  isSubmitBtnLoading,
}) => {
  const { countriesOptions } = useCountriesData();
  const minBirthDate = useMemo(
    () =>
      filters.birth_date_start
        ? dayjs(filters.birth_date_start, "DD/MM/YYYY")
        : undefined,
    [filters.birth_date_start]
  );

  const maxBirthDate = useMemo(
    () =>
      filters.birth_date_end
        ? dayjs(filters.birth_date_end, "DD/MM/YYYY")
        : undefined,
    [filters.birth_date_end]
  );

  const minCreateDate = useMemo(
    () =>
      filters.created_at_start
        ? dayjs(filters.created_at_start, "DD/MM/YYYY")
        : undefined,
    [filters.created_at_start]
  );

  const maxCreateDate = useMemo(
    () =>
      filters.created_at_end
        ? dayjs(filters.created_at_end, "DD/MM/YYYY")
        : undefined,
    [filters.created_at_end]
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} p={3}>
        <FilterTextInput
          label="Փաստաթղթի N:"
          value={filters.document_number}
          onChange={(value) => handleChange("document_number", value)}
        />
        <FilterTextInput
          label="Անունը(հայ)"
          value={filters.fisrt_name_arm}
          onChange={(value) => handleChange("fisrt_name_arm", value)}
        />
        <FilterTextInput
          label="Ազգանունը(հայ)"
          value={filters.last_name_arm}
          onChange={(value) => handleChange("last_name_arm", value)}
        />
        <FilterSelect
          options={genderOptions}
          label="Սեռը"
          value={filters.select_gender}
          onChange={(value) => handleChange("select_gender", value)}
        />
        <FilterAutocomplete
          label="Քաղաքացիություն"
          options={countriesOptions}
          value={filters.select_country}
          onChange={(event, newValue) =>
            handleChange("select_country", newValue)
          }
        />
        <FilterTextInput
          label="ՀԾՀ"
          value={filters.psn}
          onChange={(value) => handleChange("psn", value)}
        />
        <FilterDatePicker
          label="Ծննդյան ա/թ(սկսած)"
          value={filters.birth_date_start}
          onChange={(date) => {
            handleChange(
              "birth_date_start",
              date ? dayjs(date).format("DD/MM/YYYY") : null
            );
          }}
          maxDate={maxBirthDate}
        />
        <FilterDatePicker
          label="Ծննդյան ա/թ(մինչև)"
          value={filters.birth_date_end}
          onChange={(date) => {
            handleChange(
              "birth_date_end",
              date ? dayjs(date).format("DD/MM/YYYY") : null
            );
          }}
          minDate={minBirthDate}
        />
        <FilterTextInput
          label="Անունը(լատ)"
          value={filters.fisrt_name_lat}
          onChange={(value) => handleChange("fisrt_name_lat", value)}
        />
        <FilterTextInput
          label="Ազգանունը(լատ)"
          value={filters.last_name_lat}
          onChange={(value) => handleChange("last_name_lat", value)}
        />

        {/* Buttons */}
        <Grid item xs={12} md={2}>
          <LoadingButton
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            loading={isSubmitBtnLoading}
            style={{ paddingTop: 14, paddingBottom: 14 }}
          >
            ՖԻԼՏՐԵԼ
          </LoadingButton>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            size="large"
            color="secondary"
            variant="outlined"
            onClick={handleReset}
            disabled={isFetching || !isFiltersChanged}
            style={{ paddingTop: 14, paddingBottom: 14 }}
          >
            ՋՆՋԵԼ
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default memo(Filters);
