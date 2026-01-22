import dayjs from 'dayjs';
import { Card, CardContent, Grid, Typography, Divider, Chip, Box, Alert } from '@mui/material';

import useTestamentsData from '../../hooks/useTestamentsData';
import NoResults from '../NoResults/NoResults';
import ListScileton from '../listSceleton/ListScileton';

const EscsTestamentTab = ({ ssn }) => {
  const { error, isError, isLoading, data, isFetching } = useTestamentsData(ssn);
  const formatValue = (value) => (value == null || value === '' ? '—' : value);

  const formatDate = (value) => {
    if (!value) return '—';
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.format('DD.MM.YYYY') : '—';
  };

  const { lastName, firstName, fatherName, dob, phone, institutionType, institutions } = data || {};

  const fullName = [lastName, firstName, fatherName].filter(Boolean).join(' ');

  if (isError) {
    return <Alert severity="error">{error?.message || 'Սխալ է տեղի ունեցել:'}</Alert>;
  }
  return (
    <>
      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        Ուսանողի Վերաբերյալ Տեղեկատվություն
      </Typography>
      {isFetching ? (
        <ListScileton />
      ) : data === null ? (
        <NoResults />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Անձնական տվյալներ
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">ԱԱՀ</Typography>
                <Typography variant="body2">{formatValue(fullName)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Ծննդյան ա/թ</Typography>
                <Typography variant="body2">{formatDate(dob)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Հեռ</Typography>
                <Typography variant="body2">{formatValue(phone)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Ուսումնական հաստատության տեսակը</Typography>
                {institutionType ? (
                  <Chip label={institutionType} size="small" />
                ) : (
                  <Typography variant="body2">—</Typography>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              Ուսումնական հաստատության տվյալներ
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
                      <Typography variant="body2">Անվանում</Typography>
                      <Typography variant="body2">{formatValue(inst.institutionName)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">Հասցե</Typography>
                      <Typography variant="body2">
                        {formatValue(inst.institutionAddress)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">Խումբ</Typography>
                      <Typography variant="body2">{formatValue(inst.group)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">Խմբի տեսակ</Typography>
                      <Typography variant="body2">{formatValue(inst.group_type)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">Կուրս</Typography>
                      <Typography variant="body2">{formatValue(inst.class_num)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">Ավարտական տարի</Typography>
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
      )}
    </>
  );
};

export default EscsTestamentTab;
