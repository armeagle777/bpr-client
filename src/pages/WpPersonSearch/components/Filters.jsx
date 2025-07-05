import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs from "dayjs";
import useCountriesData from "../../../hooks/useCountriesData";
import FilterDatePicker from "./FilterDatePicker";
import FilterSelect from "./FilterSelect";
import FilterTextInput from "./FilterTextInput";
import {
  genderOptions,
  procedureOptions,
  cardStatusOptions,
  claimStatusOptions,
} from "../constants";
import { memo, useMemo } from "react";
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
          label="Card ID"
          value={filters.card_id}
          onChange={(value) => handleChange("card_id", value)}
        />
        <FilterTextInput
          label="Document N:"
          value={filters.document_number}
          onChange={(value) => handleChange("document_number", value)}
        />
        <FilterTextInput
          label="First Name(arm)"
          value={filters.fisrt_name_arm}
          onChange={(value) => handleChange("fisrt_name_arm", value)}
        />
        <FilterTextInput
          label="Last Name(arm)"
          value={filters.last_name_arm}
          onChange={(value) => handleChange("last_name_arm", value)}
        />
        <FilterSelect
          options={genderOptions}
          label="Gender"
          value={filters.select_gender}
          onChange={(value) => handleChange("select_gender", value)}
        />
        <FilterAutocomplete
          options={countriesOptions}
          value={filters.select_country}
          onChange={(event, newValue) =>
            handleChange("select_country", newValue)
          }
        />
        <FilterTextInput
          label="PSN"
          value={filters.psn}
          onChange={(value) => handleChange("psn", value)}
        />
        <FilterSelect
          options={procedureOptions}
          label="Procedure"
          value={filters.select_procedure}
          onChange={(value) => handleChange("select_procedure", value)}
        />
        <FilterTextInput
          label="First Name(lat)"
          value={filters.fisrt_name_lat}
          onChange={(value) => handleChange("fisrt_name_lat", value)}
        />
        <FilterTextInput
          label="Last Name(lat)"
          value={filters.last_name_lat}
          onChange={(value) => handleChange("last_name_lat", value)}
        />
        <FilterSelect
          options={cardStatusOptions}
          label="Card Status"
          value={filters.select_card_status}
          onChange={(value) => handleChange("select_card_status", value)}
        />
        <FilterSelect
          options={claimStatusOptions}
          label="Claim Status"
          value={filters.select_claim_status}
          onChange={(value) => handleChange("select_claim_status", value)}
        />
        <FilterDatePicker
          label="Created at(from)"
          value={filters.created_at_start}
          onChange={(date) => {
            handleChange(
              "created_at_start",
              date ? dayjs(date).format("DD/MM/YYYY") : null
            );
          }}
          maxDate={maxCreateDate}
        />
        <FilterDatePicker
          label="Created at(to)"
          value={filters.created_at_end}
          onChange={(date) => {
            handleChange(
              "created_at_end",
              date ? dayjs(date).format("DD/MM/YYYY") : null
            );
          }}
          minDate={minCreateDate}
        />
        <FilterDatePicker
          label="Birth date(from)"
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
          label="Birth date(to)"
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
            Submit
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
            Reset
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default memo(Filters);
