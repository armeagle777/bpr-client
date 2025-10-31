import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography, Container, Fade, Grow, useTheme, alpha } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Stack
        sx={{
          width: '100%',
          minHeight: '70vh',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <Fade in timeout={600}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 4,
            }}
          >
            <Grow in timeout={1000}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    display: 'inline-flex',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      bgcolor: alpha(theme.palette.error.main, 0.15),
                    },
                  }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: 80, color: theme.palette.error.main }} />
                </Box>
              </Box>
            </Grow>
            <Box
              sx={{
                mb: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <img src='/not_found.jpg' alt='error-404' style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            <Fade in timeout={1200}>
              <Box sx={{ mb: 4 }}>
                <Typography variant='h4' component='h1' fontWeight='bold' color='primary' gutterBottom>
                  404
                </Typography>
                <Typography variant='h6' component='p' color='text.secondary'>
                  Կներեք, էջը չի գտնվել․․․
                </Typography>
              </Box>
            </Fade>
            <Fade in timeout={1400}>
              <Button
                onClick={() => navigate(-1)}
                variant='contained'
                size='large'
                startIcon={<BackIcon />}
                sx={{
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
              >
                Վերադառնալ
              </Button>
            </Fade>
          </Box>
        </Fade>
      </Stack>
    </Container>
  );
};

export default NotFound;
