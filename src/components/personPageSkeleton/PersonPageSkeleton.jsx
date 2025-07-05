import { Box, Container, Skeleton, Stack } from '@mui/material';

import PhotoSlider from '../../components/photoSlider/PhotoSlider';
import TableScileton from '../tableScileton/TableScileton';

const PersonPageSkeleton = () => {
    return (
        <Container>
            <Stack
                direction='row'
                sx={{ pt: 4, justifyContent: 'space-between' }}
            >
                <Skeleton
                    variant='rectangular'
                    animation='wave'
                    sx={{ width: 150, height: 50 }}
                />
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    sx={{ width: 250 }}
                >
                    <Skeleton
                        animation='wave'
                        variant='rectangular'
                        sx={{ width: 50, height: 50 }}
                    />
                    <Skeleton
                        animation='wave'
                        variant='rectangular'
                        sx={{ width: 50, height: 50 }}
                    />
                    <Skeleton
                        animation='wave'
                        variant='rectangular'
                        sx={{ width: 50, height: 50 }}
                    />
                </Stack>
                <Skeleton
                    variant='rectangular'
                    animation='wave'
                    sx={{ width: 150, height: 50 }}
                />
            </Stack>
            <Stack direction='row' sx={{ mt: 2, mb: '60px' }}>
                <Skeleton
                    animation='wave'
                    variant='rectangular'
                    sx={{ width: '30%', height: 270 }}
                />
                <Stack direction='row' sx={{ width: '70%', padding: 2 }}>
                    <Stack
                        spacing={2}
                        justifyContent='left'
                        sx={{ width: '50%' }}
                    >
                        <Skeleton animation='wave' width='90%' />
                        <Skeleton animation='wave' width='90%' />
                        <Skeleton animation='wave' width='90%' />
                        <Skeleton animation='wave' width='90%' />
                        <Skeleton animation='wave' width='90%' />
                        <Skeleton animation='wave' width='90%' />
                        <Skeleton animation='wave' width='90%' />
                    </Stack>
                    <Stack
                        spacing={2}
                        justifyContent='left'
                        sx={{ width: '50%' }}
                    >
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                    </Stack>
                </Stack>
            </Stack>
            <Stack spacing={1} sx={{ pb: 3 }}>
                <TableScileton height={70} />
                <TableScileton height={70} />
            </Stack>
        </Container>
    );
};

export default PersonPageSkeleton;
