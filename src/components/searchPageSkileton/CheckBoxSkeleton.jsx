import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';

const CheckBoxSkeleton = () => {
    return (
        <Stack
            direction='row'
            sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Skeleton
                variant='rectangular'
                sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Skeleton sx={{ width: 100, height: 20 }} />
        </Stack>
    );
};

export default CheckBoxSkeleton;
