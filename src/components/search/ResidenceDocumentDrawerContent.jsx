import { Box, Chip, CircularProgress, Divider, Paper, Stack, Typography } from '@mui/material';

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <Typography variant="body2" color="text.secondary">
      <Typography component="span" variant="body2" fontWeight={600}>
        {label}:{' '}
      </Typography>
      {value}
    </Typography>
  );
};

const SectionDetails = ({ sections = [] }) => {
  if (!sections.length) return null;

  return (
    <Stack spacing={1}>
      <Typography variant="body2" fontWeight={600}>
        Բաժիններ
      </Typography>
      {sections.map((section, index) => (
        <Paper key={`section-${index}`} variant="outlined" sx={{ p: 1 }}>
          <Stack spacing={0.5}>
            <InfoRow
              label="Հարկ"
              value={`${section.FLOOR_NUMBER || '—'} (${section.FLOOR_TITLE || '—'})`}
            />
            <InfoRow label="Մակերես" value={section.AREA ? `${section.AREA} քմ` : null} />
            <InfoRow label="Կառուցման տարի" value={section.CONSTRUCTION_YEAR} />
            <InfoRow label="Կառուցվածքի նյութ" value={section.CONSTRUCTION_MATERIAL} />
            <InfoRow label="Ավարտվածության աստիճան" value={section.COMPLETION_LEVEL} />
            <InfoRow label="Փեղկերի բարձրություն" value={section.INTERNAL_HEIGHT} />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

const SubjectsList = ({ subjects = [] }) => {
  if (!subjects.length) return null;

  return (
    <Stack spacing={1}>
      <Typography variant="body2" fontWeight={600}>
        Սուբյեկտներ
      </Typography>
      {subjects.map((subject, index) => (
        <Paper key={`subject-${index}`} variant="outlined" sx={{ p: 1 }}>
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.primary" fontWeight={600}>
              {[subject.lastname, subject.firstname, subject.secondname].filter(Boolean).join(' ')}
            </Typography>
            <InfoRow label="ՀԾՀ" value={subject.ssn} />
            <InfoRow label="Անձնագիր" value={subject.passport || subject.id_card} />
            <InfoRow label="Հասցե" value={subject.address} />
            <InfoRow label="Կազմակերպություն" value={subject.organization_name} />
            <InfoRow label="Հարկային համար" value={subject.tax_number} />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

const BuildingsList = ({ buildings = [] }) => {
  if (!buildings.length) return null;

  return (
    <Stack spacing={1}>
      <Typography variant="body2" fontWeight={600}>
        Շենքեր
      </Typography>
      {buildings.map((building, index) => (
        <Paper key={`building-${index}`} variant="outlined" sx={{ p: 1, gap: 1 }}>
          <Stack spacing={0.5}>
            <InfoRow label="Կադաստրային կոդ" value={building.CADASTRAL_CODE} />
            <InfoRow label="Նպատակ" value={building.PURPOSE_OF_USE_TITLE} />
            <InfoRow
              label="Ընդհանուր մակերես"
              value={building.TOTAL_AREA ? `${building.TOTAL_AREA} քմ` : null}
            />
          </Stack>
          <SectionDetails sections={building.section} />
        </Paper>
      ))}
    </Stack>
  );
};

const RightsList = ({ rights = [] }) => {
  if (!rights.length) return null;

  return (
    <Stack spacing={2}>
      <Typography variant="body2" fontWeight={600}>
        Իրավունքներ
      </Typography>
      {rights.map((right, index) => (
        <Paper key={`right-${index}`} variant="outlined" sx={{ p: 1.5 }}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={600}>
                {right.RIGHT_TYPE || 'Անհայտ իրավունք'}
              </Typography>
              {right.CERTIFICATE_NUMBER && (
                <Chip size="small" label={`Հավաստագիր № ${right.CERTIFICATE_NUMBER}`} />
              )}
            </Stack>
            <InfoRow label="Գրանցման ամսաթիվ" value={right.REG_DATE} />
            <InfoRow label="Վկայական մուտք" value={right.CERTIFICATE_PASS} />
            <InfoRow label="Իրավունքի ժամկետ" value={right.RIGHT_TERM_DATE} />
            <SubjectsList subjects={right.SUBJECTS} />
            <BuildingsList buildings={right.BUILDINGS} />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

const buildAddressText = (unit = {}) => {
  if (unit.UNIT_ADDRESS) return unit.UNIT_ADDRESS;
  const parts = [
    unit.REGION,
    unit.COMMUNITY,
    [unit.STREET_NAME, unit.STREET_TYPE].filter(Boolean).join(' '),
    unit.BUILDING && `շենք ${unit.BUILDING}`,
    unit.HOUSE && `տուն ${unit.HOUSE}`,
  ].filter(Boolean);

  return parts.join(', ');
};

const UnitCard = ({ unit }) => {
  const address = buildAddressText(unit);
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <Box>
          <Typography variant="subtitle1" color="text.primary">
            {address || 'Հասցեն նշված չէ'}
          </Typography>
          <InfoRow label="Միավորի ID" value={unit.UNIT_ID} />
          <InfoRow label="Շենքի նպատակ" value={unit.PURPOSE_OF_THE_BUILDING} />
          <InfoRow
            label="Կադաստրային արժեք"
            value={unit.CAD_VALUE ? `${unit.CAD_VALUE} ֏` : null}
          />
        </Box>
        <Divider />
        <RightsList rights={unit.RIGHTS} />
      </Stack>
    </Paper>
  );
};

const ResidenceDocumentDrawerContent = ({ data, isLoading, isError }) => {
  if (isLoading) {
    return (
      <Stack alignItems="center" spacing={1} sx={{ mt: 4 }}>
        <CircularProgress size={28} />
        <Typography variant="body2">Տվյալները բեռնվում են...</Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Typography variant="body2" color="error" sx={{ mt: 2 }}>
        Տվյալների ստացումը ձախողվեց
      </Typography>
    );
  }

  const units = Array.isArray(data) ? data : [];

  if (!units.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Տվյալ փաստաթղթի մանրամասները հասանելի չեն
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {units.map((unit) => (
        <UnitCard key={unit.UNIT_ID || unit.UNIT_ADDRESS} unit={unit} />
      ))}
    </Stack>
  );
};

export default ResidenceDocumentDrawerContent;
