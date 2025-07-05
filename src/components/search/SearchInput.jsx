import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { useMemo } from 'react';

function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = useMemo(() => {
        if (focused) {
            return 'և = եվ | Ծննդ․ տարեթիվը = օօ/աա/թթթթ';
        }

        return 'ԱՆՈԻՆ | ԱԶԳԱՆՈՒՆ | ՀԱՅՐԱՆՈՒՆ | ԾՆՆԴ․ ՏԱՐԵԹԻՎ | ՓԱՍՏԱԹՈՒՂԹ | ՀԾՀ';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
}

const SearchInput = ({
    searchString,
    setSearchString,
    handleSubmit,
    handleClearButton,
}) => {
    return (
        <Stack direction='row' sx={{ width: 600 }}>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ width: '70ch', position: 'relative' }}>
                    <OutlinedInput
                        endAdornment={
                            <IconButton
                                type='submit'
                                color='primary'
                                aria-label='search-person'
                                sx={{
                                    position: 'absolute',
                                    right: '5px',
                                    height: '100%',
                                }}
                            >
                                <SearchIcon />
                            </IconButton>
                        }
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        maxRows={1}
                        fullWidth
                        placeholder='Որոնում'
                    />
                    <MyFormHelperText />
                    {searchString && (
                        <IconButton
                            onClick={handleClearButton}
                            color='primary'
                            aria-label='add to shopping cart'
                            sx={{
                                position: 'absolute',
                                right: '45px',
                                top: '7px',
                            }}
                        >
                            <DeleteIcon color='warning' />
                        </IconButton>
                    )}
                </FormControl>
            </form>
        </Stack>
    );
};

export default SearchInput;

// clearIcon={}
// sx={{ width: 500, marginRight: 'none', }}
