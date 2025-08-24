import dayjs from "dayjs";
import { memo, useMemo } from "react";
import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import FilterDatePicker from "./FilterDatePicker";
import FilterSelect from "./FilterSelect";
import FilterTextInput from "./FilterTextInput";
import { genderOptions } from "../AsylumSearch.constants";
import FilterAutocomplete from "./FilterAutocomplete";
import FilterCheckbox from "./FilterCheckbox";

const Filters = ({
  filters,
  isFetching,
  handleReset,
  handleChange,
  handleSubmit,
  ethnicOptions,
  religionOptions,
  countriesOptions,
  isFiltersChanged,
  isSubmitBtnLoading,
}) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={2}
        p={3}
        display="flex"
        justifyContent="flex-end"
      >
        <FilterTextInput
          label="Փաստաթղթի N:"
          value={filters.doc_num}
          onChange={(value) => handleChange("doc_num", value)}
        />
        <FilterTextInput
          label="Անունը(հայ)"
          value={filters.f_name_arm}
          onChange={(value) => handleChange("f_name_arm", value)}
        />
        <FilterTextInput
          label="Ազգանունը(հայ)"
          value={filters.l_name_arm}
          onChange={(value) => handleChange("l_name_arm", value)}
        />
        <FilterSelect
          options={genderOptions}
          label="Սեռը"
          value={filters.select_gender}
          onChange={(value) => handleChange("select_gender", value)}
        />
        <FilterAutocomplete
          label="Ազգությունը"
          options={ethnicOptions}
          value={filters.select_etnicity}
          onChange={(event, newValue) => {
            return handleChange("select_etnicity", newValue);
          }}
        />
        <FilterTextInput
          label="Անունը(լատ)"
          value={filters.f_name_eng}
          onChange={(value) => handleChange("f_name_eng", value)}
        />
        <FilterTextInput
          label="Ազգանունը(լատ)"
          value={filters.l_name_eng}
          onChange={(value) => handleChange("l_name_eng", value)}
        />
        <FilterAutocomplete
          label="Քաղաքացիություն"
          options={countriesOptions}
          value={filters.select_country}
          onChange={(event, newValue) => {
            return handleChange("select_country", newValue);
          }}
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
