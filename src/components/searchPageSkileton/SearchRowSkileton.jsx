import { Skeleton, Stack } from '@mui/material';

const SearchRowSkileton = () => {
    return (
        <Stack
            direction='row'
            sx={{
                width: '100%',
                height: '100px',
            }}
        >
            <Skeleton
                variant='rectangular'
                animation='wave'
                sx={{ height: '100%', width: '100px' }}
            />
            <Stack direction='column' px={2} sx={{ width: '50%' }}>
                <Stack direction='column'>
                    <Skeleton
                        animation='wave'
                        sx={{ height: '30px', width: '70%' }}
                    />
                    <Skeleton animation='wave' sx={{ width: '60%' }} />
                </Stack>
                <Stack spacing={1} direction='row' mt={1}>
                    <Skeleton
                        animation='wave'
                        variant='rectangular'
                        sx={{ width: 150, height: 35 }}
                    />
                    <Skeleton
                        animation='wave'
                        variant='rectangular'
                        sx={{ width: 150, height: 35 }}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SearchRowSkileton;
