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
} from '@mui/material';
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

  return (
    <Box sx={{ flex: 1, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Անձնական էջ</Typography>
      </Box>

      <Tabs value={0} sx={{ mb: 2 }}>
        <Tab label="Կարգաբերումներ" />
        {/* Add other tabs if needed */}
      </Tabs>

      <Stack spacing={4} maxWidth={800} mx="auto">
        {/* Personal Info Card */}
        <Card>
          <CardContent>
            <Typography variant="h6">Անձնական տվյալներ</Typography>
            <Typography variant="body2">
              Անձնական տվյալների խմբագրման դաշտը դեռ հասանելի չէ.
            </Typography>

            <Stack spacing={2} mt={2}>
              <TextField label="Անուն" value={user.firstName} fullWidth />
              <TextField label="Ազգանուն" value={user.lastName} fullWidth />
              <TextField label="Role" value={user.Role} fullWidth />
              <TextField label="էլ. հասցե" value={user.email} fullWidth />
              <TextField label="Հեռախոս" value="" fullWidth />
            </Stack>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card>
          <CardContent>
            <Typography variant="h6">Գաղտնաբառ</Typography>
            <Stack spacing={2} mt={2}>
              <TextField
                label="Հին գաղտնաբառ"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <TextField
                label="Նոր գաղտնաբառ"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
              />
              <TextField
                label="Հաստատել"
                type="password"
                value={approvedPassword}
                onChange={(e) => setApprovedPassword(e.target.value)}
                fullWidth
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={resetPasswordFields}>Չեղարկել</Button>
            <Button
              variant="contained"
              disabled={!canSubmit}
              onClick={() => onChangePwdSubmit(user.id)}
            >
              Պահպանել
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
};

export default Profile;
