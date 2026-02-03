import {
  Box,
  Card,
  Stack,
  Button,
  Avatar,
  Divider,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PersonLightDataCard = ({ data }) => {
  const navigate = useNavigate();

  const {
    psn,
    firstName,
    lastName,
    middleName,
    birthdate,
    imageBase64,
    probability,
    registrationAddress,
  } = data || {};

  const formatBirthdate = (date) => {
    if (!date) return '—';
    if (date.startsWith('00/00')) return 'Անորոշ';
    return date;
  };

  // probability indicator (like equalizer)
  const getBars = (value) => {
    const levels = 6; // number of bars
    const activeBars = Math.round(value * levels);

    // pick color based on value range
    let color = 'grey.400';
    if (value <= 0.4) color = 'red';
    else if (value <= 0.7) color = 'yellow';
    else color = 'green';

    return Array.from({ length: levels }, (_, i) => {
      const isActive = i < activeBars;

      return (
        <Box
          key={i}
          sx={{
            width: 10,
            height: 15,
            borderRadius: '2px',
            bgcolor: isActive ? color : 'grey.400',
            mb: 0.5,
            transition: 'all 0.3s ease',
          }}
        />
      );
    });
  };

  return (
    <Card sx={{ display: 'flex', borderRadius: 3, boxShadow: 3, position: 'relative' }}>
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2} alignItems="center">
          <Avatar
            src={imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : ''}
            sx={{ width: 100, height: 100 }}
          >
            {firstName?.[0] || '?'}
          </Avatar>

          <Typography variant="h6" fontWeight="bold">
            {firstName} {middleName} {lastName}
          </Typography>

          <Divider flexItem />

          <Stack spacing={1} sx={{ width: '100%' }}>
            <Typography variant="body2">
              <strong>ՀԾՀ:</strong> {psn || '—'}
            </Typography>
            <Typography variant="body2">
              <strong>Ծննդյան ամսաթիվ:</strong> {formatBirthdate(birthdate)}
            </Typography>
            <Typography variant="body2">
              <strong>Գրանցման հասցե:</strong> {registrationAddress || '—'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      {probability !== undefined && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            minWidth: 40,
          }}
        >
          {getBars(probability)}
          <Typography variant="caption" mt={1}>
            {(probability * 100).toFixed(0)}%
          </Typography>
        </Box>
      )}

      {psn && (
        <CardActions
          sx={{ position: 'absolute', bottom: 8, right: 0, transform: 'translateX(-50%)' }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/bpr/${psn}?fromTab=image`)}
          >
            Տեսնել մանրամասն
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default PersonLightDataCard;
