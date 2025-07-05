import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIos';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Stack
            sx={{ width: '100%', height: '500px', alignItems: 'center', pt: 2 }}
        >
            <Box sx={{}}>
                <img src='/not_found.jpg' alt='error-404' />
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant='h6' component='span'>
                    Կներեք, էջը չի գտնվել․․․
                </Typography>
            </Box>
            <Box>
                <Button
                    onClick={() => navigate(-1)}
                    variant='outlined'
                    startIcon={<BackIcon />}
                >
                    Վերադառնալ
                </Button>
            </Box>
        </Stack>
    );
};

export default NotFound;
