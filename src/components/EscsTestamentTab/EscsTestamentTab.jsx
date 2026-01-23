import dayjs from 'dayjs';
import { Card, CardContent, Grid, Typography, Divider, Chip, Box, Alert } from '@mui/material';

import useTestamentsData from '../../hooks/useTestamentsData';
import DataLoader from '../DataLoader/DataLoader';
import NoResults from '../NoResults/NoResults';

const hasValue = (value) => value != null && value !== '';
const formatValue = (value) => (hasValue(value) ? value : '—');

const formatDate = (value) => {
  if (!value) return '—';
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format('DD.MM.YYYY') : '—';
};

const formatFinishDate = (day, month, year) => {
  if (!hasValue(day) && !hasValue(month) && !hasValue(year)) return '—';
  if (hasValue(day) && hasValue(month) && hasValue(year)) {
    const parsed = dayjs(`${year}-${month}-${day}`);
    return parsed.isValid() ? parsed.format('DD.MM.YYYY') : `${day}.${month}.${year}`;
  }
  if (hasValue(month) && hasValue(year)) {
    const parsed = dayjs(`${year}-${month}-01`);
    return parsed.isValid() ? parsed.format('MM.YYYY') : `${month}.${year}`;
  }
  return [day, month, year].filter(hasValue).join('.');
};

const EscsTestamentTab = ({ ssn }) => {
  const { error, isError, isLoading, data } = useTestamentsData(ssn);

  if (isLoading) return <DataLoader />;
  if (isError) {
    return <Alert severity="error">{error?.response?.data?.message || error?.message}</Alert>;
  }
  if (!data) return <NoResults />;

  const fallbackPersonal = data?.university_data || {};
  const lastName = data?.lastName ?? fallbackPersonal.lastName;
  const firstName = data?.firstName ?? fallbackPersonal.firstName;
  const fatherName = data?.fatherName ?? fallbackPersonal.fatherName;
  const dob = data?.dob ?? fallbackPersonal.dob;
  const phone = data?.phone ?? fallbackPersonal.phone;
  const institutionType = data?.institutionType;

  const fullName = [lastName, firstName, fatherName].filter(Boolean).join(' ');

  const institutionsFromUniversity = Array.isArray(data?.university_data?.institutions)
    ? data.university_data.institutions
    : [];

  const derivedInstitution = {
    institutionName: data?.institutionName,
    institutionAddress: data?.institutionAddress,
    institutionType: data?.institutionType,
    group: data?.group,
    class_num: data?.class_,
    grade: data?.grade,
    group_type: data?.group_type,
    director: data?.director,
    tax_id: data?.tax_id,
    marz_id: data?.marz_id,
    finish_day: data?.finish_day,
    finish_month: data?.finish_month,
    finish_year: data?.finish_year,
  };

  const institutions = institutionsFromUniversity.length
    ? institutionsFromUniversity
    : Object.values(derivedInstitution).some(hasValue)
    ? [derivedInstitution]
    : [];

  const scores = Array.isArray(data?.scores?.total) ? data.scores.total : [];
  const lingoScore = data?.lingoScore || null;
  const parents = data?.parents || null;
  const characteristics = data?.student_characteristics || null;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Personal Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Student ID</Typography>
            <Typography variant="body2">{formatValue(data?.student_id)}</Typography>
          </Grid>
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
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Education Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Grade</Typography>
            <Typography variant="body2">{formatValue(data?.grade)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Class</Typography>
            <Typography variant="body2">{formatValue(data?.class_)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Group</Typography>
            <Typography variant="body2">{formatValue(data?.group)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Group Type</Typography>
            <Typography variant="body2">{formatValue(data?.group_type)}</Typography>
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

        {institutions.length > 0 ? (
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
                  <Typography variant="body2">Institution Type</Typography>
                  {inst.institutionType ? (
                    <Chip label={inst.institutionType} size="small" />
                  ) : (
                    <Typography variant="body2">—</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Director</Typography>
                  <Typography variant="body2">{formatValue(inst.director)}</Typography>
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
                  <Typography variant="body2">
                    {formatValue(inst.class_num ?? inst.class_)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Grade</Typography>
                  <Typography variant="body2">{formatValue(inst.grade)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Tax ID</Typography>
                  <Typography variant="body2">{formatValue(inst.tax_id)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Marz ID</Typography>
                  <Typography variant="body2">{formatValue(inst.marz_id)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Finish Date</Typography>
                  <Typography variant="body2">
                    {formatFinishDate(inst.finish_day, inst.finish_month, inst.finish_year)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body2">—</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Scores
        </Typography>

        {scores.length > 0 ? (
          scores.map((scoreItem, index) => (
            <Box
              key={`${scoreItem.subject || 'score'}-${index}`}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                mb: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Subject</Typography>
                  <Typography variant="body2">{formatValue(scoreItem.subject)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Score</Typography>
                  <Typography variant="body2">{formatValue(scoreItem.score)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Score Scale</Typography>
                  <Typography variant="body2">{formatValue(scoreItem.score_scale)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Class</Typography>
                  <Typography variant="body2">{formatValue(scoreItem.class_)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">School</Typography>
                  <Typography variant="body2">{formatValue(scoreItem.school)}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body2">—</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Language Score
        </Typography>

        {lingoScore ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Subject</Typography>
              <Typography variant="body2">{formatValue(lingoScore.subject)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Score</Typography>
              <Typography variant="body2">{formatValue(lingoScore.score)}</Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2">—</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Parents
        </Typography>

        {parents ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Parent</Typography>
              <Typography variant="body2">{formatValue(parents.parent)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Full Name</Typography>
              <Typography variant="body2">
                {formatValue(
                  [parents.last_name, parents.first_name, parents.father_name]
                    .filter(Boolean)
                    .join(' ')
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">SSN</Typography>
              <Typography variant="body2">{formatValue(parents.ssn)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Phone</Typography>
              <Typography variant="body2">{formatValue(parents.phone)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Document</Typography>
              <Typography variant="body2">{formatValue(parents.document)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Ident Document</Typography>
              <Typography variant="body2">{formatValue(parents.ident_document)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Document Number</Typography>
              <Typography variant="body2">{formatValue(parents.document_number)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Citizenship</Typography>
              <Typography variant="body2">{formatValue(parents.citizenship)}</Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2">—</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Student Characteristics
        </Typography>

        {characteristics ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Successes</Typography>
              <Typography variant="body2">{formatValue(characteristics.successes)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Parents Data</Typography>
              <Typography variant="body2">{formatValue(characteristics.parents_data)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Civil Maturity</Typography>
              <Typography variant="body2">{formatValue(characteristics.civil_maturity)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Harmful Habits</Typography>
              <Typography variant="body2">{formatValue(characteristics.harmful_habits)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Chronic Diseases</Typography>
              <Typography variant="body2">{formatValue(characteristics.chronic_diseases)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Mental Illnesses</Typography>
              <Typography variant="body2">
                {formatValue(characteristics.has_mental_illnesses)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Family Relationships</Typography>
              <Typography variant="body2">
                {formatValue(characteristics.family_relationships)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Friends Communication</Typography>
              <Typography variant="body2">
                {formatValue(characteristics.friends_communication)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Psychological Characteristics</Typography>
              <Typography variant="body2">
                {formatValue(characteristics.psychological_characteristics)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Status</Typography>
              <Typography variant="body2">{formatValue(characteristics.status)}</Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2">—</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EscsTestamentTab;
