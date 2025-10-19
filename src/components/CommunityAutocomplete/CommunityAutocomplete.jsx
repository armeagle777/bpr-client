import { Autocomplete, TextField, CircularProgress } from '@mui/material';

const CommunityAutocomplete = ({ value, onChange, loading, options }) => {
  return (
    <Autocomplete
      id="community"
      disabled={!options?.length}
      options={options || []}
      value={options?.find((c) => c.name === value) || null}
      getOptionLabel={(option) => option.name}
      onChange={onChange}
      loading={loading}
      isOptionEqualToValue={(option, val) => option.name === val.value}
      sx={{ m: 1, width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Համայնք"
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

export default CommunityAutocomplete;
