import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import { Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

import TableBody from './TableBody';
import TableHead from './TableHead';

const AddressTable = ({ addresses }) => {
    return (
        <Stack spacing={1}>
            <Typography variant='body2' component='span'>
                Հասցեներ
            </Typography>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 700 }}
                    size='small'
                    aria-label='customized table'
                >
                    <TableHead />
                    <TableBody rows={addresses} />
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default AddressTable;
