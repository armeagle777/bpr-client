import { Box, Container, Typography, Fade, useTheme, alpha } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Fade in timeout={800}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            py: 8,
          }}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: alpha(theme.palette.primary.main, 0.15),
              },
            }}
          >
            <HomeIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
          </Box>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
            Բարի գալուստ
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
            Ներքին Որոնման Համակարգ
          </Typography>
        </Box>
      </Fade>
    </Container>
  );
};

export default Home;
