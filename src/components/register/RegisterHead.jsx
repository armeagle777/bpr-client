import SearchIcon from '@mui/icons-material/PersonSearch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';

import { useCompanies } from '../context/companies';
import { useEffect } from 'react';

const RegisterHead = () => {
    const { taxId } = useParams();

    const { taxIdInputValue, setTaxIdInputValue, handleSubmitSearch } =
        useCompanies();

    useEffect(() => {
        if (taxId) {
            handleSubmitSearch(taxId);
        }
    }, [taxId]);

    const navigate = useNavigate();

    return (
        <Stack
            spacing={2}
            sx={{
                width: '100%',
                alignItems: 'center',
                pt: '20px',
            }}
        >
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '18ch' },
                }}
                noValidate
                autoComplete='off'
            >
                <TextField
                    id='tax_id'
                    label='ՀՎՀՀ'
                    type='search'
                    value={taxIdInputValue}
                    onChange={(e) => setTaxIdInputValue(e.target.value)}
                    autoFocus
                />
                <Button
                    onClick={() => navigate(`/register/${taxIdInputValue}`)}
                    variant='contained'
                    size='large'
                    color='primary'
                    sx={{ py: 2 }}
                >
                    <SearchIcon />
                </Button>
            </Box>
        </Stack>
    );
};

export default RegisterHead;
