import {
  Box,
  Tab,
  Stack,
  Card,
  Tabs,
  Button,
  TextField,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  Fade,
  Slide,
  useTheme,
  alpha,
  Container,
} from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon, Settings as SettingsIcon } from '@mui/icons-material';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import useProfileData from '../../hooks/useProfileData';

const Profile = () => {
  const user = useAuthUser();
  const {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    approvedPassword,
    setApprovedPassword,
    canSubmit,
    onChangePwdSubmit,
    resetPasswordFields,
    changePwdLoading,
  } = useProfileData();

  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ flex: 1, width: '100%', p: 3 }}>
        <Fade in timeout={600}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PersonIcon color="primary" />
              </Box>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Անձնական էջ
              </Typography>
            </Box>
          </Box>
        </Fade>

        <Fade in timeout={800}>
          <Tabs
            value={0}
            sx={{
              mb: 3,
              borderBottom: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
              '& .MuiTab-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <Tab
              icon={<SettingsIcon />}
              iconPosition="start"
              label="Կարգաբերումներ"
            />
          </Tabs>
        </Fade>

        <Stack spacing={4} maxWidth={900} mx="auto">
          {/* Personal Info Card */}
          <Slide direction="up" in timeout={1000}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    Անձնական տվյալներ
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Անձնական տվյալների խմբագրման դաշտը դեռ հասանելի չէ.
                </Typography>

                <Stack spacing={2.5}>
                  <TextField
                    label="Անուն"
                    value={user.firstName}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Ազգանուն"
                    value={user.lastName}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Role"
                    value={user.Role}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="էլ. հասցե"
                    value={user.email}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Հեռախոս"
                    value=""
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Slide>

          {/* Password Change Card */}
          <Slide direction="up" in timeout={1200}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.05)} 0%, ${alpha(theme.palette.warning.main, 0.02)} 100%)`,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: `0 8px 16px ${alpha(theme.palette.warning.main, 0.15)}`,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <LockIcon color="warning" />
                  <Typography variant="h6" fontWeight="bold" color="warning.main">
                    Գաղտնաբառ
                  </Typography>
                </Box>
                <Stack spacing={2.5} mt={2}>
                  <TextField
                    label="Հին գաղտնաբառ"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Նոր գաղտնաբառ"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Հաստատել"
                    type="password"
                    value={approvedPassword}
                    onChange={(e) => setApprovedPassword(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  />
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                <Button
                  onClick={resetPasswordFields}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Չեղարկել
                </Button>
                <Button
                  variant="contained"
                  disabled={!canSubmit}
                  onClick={() => onChangePwdSubmit(user.id)}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                  }}
                >
                  Պահպանել
                </Button>
              </CardActions>
            </Card>
          </Slide>
        </Stack>
      </Box>
    </Container>
  );
};

export default Profile;
