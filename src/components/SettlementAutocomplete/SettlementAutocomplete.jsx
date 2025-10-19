import { Autocomplete, TextField, CircularProgress } from '@mui/material';

const SettlementAutocomplete = ({ value, onChange, loading, options }) => {
  return (
    <Autocomplete
      id="settlement"
      disabled={!options?.length}
      options={options || []}
      value={options?.find((s) => s.name === value) || null}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => onChange(newValue)}
      loading={loading}
      sx={{ m: 1, width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Բնակավայր"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} color="inherit" /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SettlementAutocomplete;
