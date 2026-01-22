import dayjs from 'dayjs';
import { Card, CardContent, Grid, Typography, Divider, Chip, Box } from '@mui/material';

import useTestamentsData from '../../hooks/useTestamentsData';

const EscsTestamentTab = (ssn) => {
  const { error, isError, isLoading, data } = useTestamentsData(ssn);
  const formatValue = (value) => (value == null || value === '' ? '—' : value);

  const formatDate = (value) => {
    if (!value) return '—';
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.format('DD.MM.YYYY') : '—';
  };

  const { lastName, firstName, fatherName, dob, phone, institutionType, institutions } = data;

  const fullName = [lastName, firstName, fatherName].filter(Boolean).join(' ');
  if (!data) return null;
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Personal Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Full Name</Typography>
            <Typography variant="body2">{formatValue(fullName)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Date of Birth</Typography>
            <Typography variant="body2">{formatDate(dob)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Phone</Typography>
            <Typography variant="body2">{formatValue(phone)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Institution Type</Typography>
            {institutionType ? (
              <Chip label={institutionType} size="small" />
            ) : (
              <Typography variant="body2">—</Typography>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Institutions
        </Typography>

        {Array.isArray(institutions) && institutions.length > 0 ? (
          institutions.map((inst, index) => (
            <Box
              key={`${inst.institutionName || 'institution'}-${index}`}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                mb: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2">Institution Name</Typography>
                  <Typography variant="body2">{formatValue(inst.institutionName)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Address</Typography>
                  <Typography variant="body2">{formatValue(inst.institutionAddress)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Group</Typography>
                  <Typography variant="body2">{formatValue(inst.group)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Group Type</Typography>
                  <Typography variant="body2">{formatValue(inst.group_type)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Class Number</Typography>
                  <Typography variant="body2">{formatValue(inst.class_num)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Finish Year</Typography>
                  <Typography variant="body2">{formatValue(inst.finish_year)}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body2">—</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EscsTestamentTab;
