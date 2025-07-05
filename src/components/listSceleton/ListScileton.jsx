import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ListScileton = () => {
    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Skeleton
                animation='wave'
                sx={{ width: '30%', height: 20, mb: 1 }}
            />
            <Skeleton
                sx={{ height: 55, mb: 3 }}
                variant='rectangular'
                animation='wave'
            />
            <Skeleton
                animation='wave'
                sx={{ width: '30%', height: 20, mb: 1 }}
            />
            <Skeleton
                sx={{ height: 55, mb: 3 }}
                variant='rectangular'
                animation='wave'
            />
            <Skeleton
                animation='wave'
                sx={{ width: '30%', height: 20, mb: 1 }}
            />
            <Skeleton
                sx={{ height: 55 }}
                variant='rectangular'
                animation='wave'
            />
        </Box>
    );
};

export default ListScileton;
