import { memo, useMemo, useState } from 'react';
import {
  Box,
  Card,
  Chip,
  Avatar,
  Divider,
  Skeleton,
  Accordion,
  Typography,
  CardContent,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  IconButton,
  Stack,
  Paper,
  Fade,
  Grow,
  Slide,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Circle as CircleIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Description as DescriptionIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';

import useFetchPerson from '../../../hooks/useFetchPerson';
import { getBestPhoto } from '../TaxEmployeesTab.helpers';

const EmployeeCard = ({ data }) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { personalinfo, positions, isActiveEmployee } = data;
  const { firstname, lastname, birthdate, ssn } = personalinfo;

  const { data: personBprData, isError, isLoading } = useFetchPerson(ssn, inView);

  const documents = personBprData?.documents;
  const imageUrl = getBestPhoto(documents) || '';

  const handleCardClick = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Card
      ref={ref}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      sx={{
        maxWidth: 340,
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: cardHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: cardHovered
          ? `0 12px 24px ${alpha(theme.palette.primary.main, 0.3)}`
          : '0 4px 12px rgba(0,0,0,0.15)',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      {/* Profile Image */}
      <Box sx={{ p: 2, position: 'relative' }}>
        {isLoading ? (
          <Skeleton variant="rounded" width={150} height={150} sx={{ borderRadius: 2 }} />
        ) : (
          <Avatar
            src={imageUrl}
            alt={`${firstname} ${lastname}`}
            sx={{
              width: 150,
              height: 150,
              borderRadius: 2,
              transition: 'all 0.3s ease-in-out',
              transform: cardHovered ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0deg)',
              boxShadow: cardHovered
                ? `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {isError ? <PersonIcon /> : `${firstname?.[0]}${lastname?.[0]}`}
          </Avatar>
        )}

        {/* Status Indicator */}
        {isActiveEmployee && (
          <Chip
            icon={
              <CircleIcon
                sx={{
                  fontSize: 12,
                }}
                color="success"
              />
            }
            label="Active"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'green',
              bgcolor: 'white',
              fontWeight: 'bold',
            }}
          />
        )}
      </Box>

      {/* Info */}
      <CardContent
        sx={{
          textAlign: 'center',
          pb: 1,
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
          },
        }}
        onClick={handleCardClick}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            textTransform: 'uppercase',
            mb: 1,
            transition: 'all 0.3s ease-in-out',
            color: cardHovered ? theme.palette.primary.main : 'inherit',
            transform: cardHovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          {firstname}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            textTransform: 'uppercase',
            mb: 1,
            transition: 'all 0.3s ease-in-out',
            color: cardHovered ? theme.palette.primary.main : 'inherit',
            transform: cardHovered ? 'translateX(4px)' : 'translateX(0)',
            transitionDelay: '0.05s',
          }}
        >
          {lastname}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            transition: 'opacity 0.3s ease-in-out',
            opacity: cardHovered ? 0.8 : 1,
          }}
        >
          Ծննդ ա/թ: {birthdate}
        </Typography>
      </CardContent>

      {/* Accordion for Positions */}

      <Accordion sx={{ width: '100%', boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Դրույքներ
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {positions?.map((pos, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                {pos.positionname}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {pos.startdate} – {pos.enddate || 'Հիմա'}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ width: '100%' }} />

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 600, md: 800 },
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
            backdropFilter: 'blur(10px)',
          },
        }}
        transitionDuration={400}
      >
        <Box
          sx={{
            p: 3,
            height: '100%',
            overflowY: 'auto',
            background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 100%)`,
          }}
        >
          {/* Header */}
          <Fade in={drawerOpen} timeout={500}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mb: 3,
                pb: 2,
                borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BadgeIcon color="primary" />
                </Box>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  Աշխատակցի Վերաբերյալ Տեղեկատվություն
                </Typography>
              </Box>
              <IconButton
                onClick={handleCloseDrawer}
                sx={{
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    transform: 'rotate(90deg)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Fade>

          {/* Personal Info */}
          <Slide direction="up" in={drawerOpen} timeout={600}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PersonIcon color="primary" />
                </Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Անձնական Տվյալներ
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    Անուն:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {firstname}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    Ազգանուն:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {lastname}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    Ծննդյան ամսաթիվ:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {birthdate}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    ՀՀ ԱՆ:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {ssn}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Slide>

          {/* Documents Section */}
          {personBprData?.documents && personBprData.documents.length > 0 && (
            <Slide direction="up" in={drawerOpen} timeout={800}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.02)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: `0 8px 16px ${alpha(theme.palette.info.main, 0.15)}`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <DescriptionIcon color="info" />
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="info.main">
                    Փաստաթղթեր
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {personBprData.documents.map((doc, idx) => (
                    <Grow in={drawerOpen} timeout={1000 + idx * 100} key={idx}>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.background.paper, 0.8),
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.info.main, 0.05),
                            borderColor: alpha(theme.palette.info.main, 0.3),
                            transform: 'translateX(8px)',
                            boxShadow: `0 4px 12px ${alpha(theme.palette.info.main, 0.1)}`,
                          },
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                          <Chip
                            label={doc.Document_Type}
                            size="small"
                            sx={{
                              fontWeight: 'bold',
                              bgcolor: alpha(theme.palette.info.main, 0.1),
                              color: theme.palette.info.main,
                            }}
                          />
                          <Chip
                            label={doc.Document_Status}
                            size="small"
                            color={doc.Document_Status === 'PRIMARY_VALID' ? 'success' : 'default'}
                            sx={{ fontWeight: 'medium' }}
                          />
                        </Stack>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Փաստաթղթի համար:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {doc.Document_Number}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Վավեր է մինչև:
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {doc.PassportData?.Passport_Validity_Date || 'N/A'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Grow>
                  ))}
                </Stack>
              </Paper>
            </Slide>
          )}

          {/* Addresses Section */}
          {personBprData?.addresses && personBprData.addresses.length > 0 && (
            <Slide direction="up" in={drawerOpen} timeout={1000}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)} 0%, ${alpha(theme.palette.success.main, 0.02)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: `0 8px 16px ${alpha(theme.palette.success.main, 0.15)}`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <HomeIcon color="success" />
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    Հասցեներ
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {personBprData.addresses.map((address, idx) => (
                    <Grow in={drawerOpen} timeout={1200 + idx * 100} key={idx}>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.background.paper, 0.8),
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.success.main, 0.05),
                            borderColor: alpha(theme.palette.success.main, 0.3),
                            transform: 'translateX(8px)',
                            boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.1)}`,
                          },
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                          <Chip
                            label={`Հասցե ${idx + 1}`}
                            size="small"
                            sx={{
                              fontWeight: 'bold',
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                              color: theme.palette.success.main,
                            }}
                          />
                          {address.RegistrationData?.Registration_Type === 'CURRENT' && (
                            <Chip
                              label="Ընթացիկ"
                              size="small"
                              color="success"
                              sx={{ fontWeight: 'medium' }}
                            />
                          )}
                        </Stack>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Տարածաշրջան:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {address.RegistrationAddress?.Region || 'N/A'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Համայնք:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {address.RegistrationAddress?.Community || 'N/A'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Փողոց:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {address.RegistrationAddress?.Street || 'N/A'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Տուն:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {address.RegistrationAddress?.Building || 'N/A'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Նամակագրության ինդեքս:
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {address.RegistrationAddress?.Postal_Index || 'N/A'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Գրանցման ամսաթիվ:
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {address.RegistrationData?.Registration_Date || 'N/A'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Գրանցման նպատակ:
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {address.RegistrationData?.Registration_Aim?.AimName || 'N/A'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Grow>
                  ))}
                </Stack>
              </Paper>
            </Slide>
          )}

          {/* Additional Info */}
          <Slide direction="up" in={drawerOpen} timeout={1200}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.05)} 0%, ${alpha(theme.palette.warning.main, 0.02)} 100%)`,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: `0 8px 16px ${alpha(theme.palette.warning.main, 0.15)}`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <InfoIcon color="warning" />
                </Box>
                <Typography variant="h6" fontWeight="bold" color="warning.main">
                  Լրացուցիչ Տվյալներ
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.warning.main, 0.05),
                    },
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    PNum:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {personBprData?.PNum || 'N/A'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.warning.main, 0.05),
                    },
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    Կարգավիճակ:
                  </Typography>
                  <Chip
                    label={personBprData?.SSN_Indicator ? 'Ակտիվ' : 'Ոչ ակտիվ'}
                    size="small"
                    color={personBprData?.SSN_Indicator ? 'success' : 'default'}
                    sx={{ fontWeight: 'medium' }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Slide>
        </Box>
      </Drawer>
    </Card>
  );
};

export default memo(EmployeeCard);
