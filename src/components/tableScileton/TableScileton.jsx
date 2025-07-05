import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const TableScileton = ({ height }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Skeleton
                animation='wave'
                sx={{ width: '30%', height: 20, mb: 1 }}
            />
            <Skeleton
                sx={{ height: 35, borderRadius: '5px 5px 0 0 ' }}
                variant='rectangular'
                animation='wave'
            />
            <Skeleton
                sx={{ height: height || 180, borderRadius: '0 0 5px 5px' }}
                variant='rectangular'
            />
        </Box>
    );
};
export default TableScileton;
