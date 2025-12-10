import { Document, Page, Text, View } from '@react-pdf/renderer';

import { financesPdfStyles } from './templates.constants';
import registerPdfFonts from './registerFonts';
import { formatDate } from './templates.helpers';

registerPdfFonts();

const chunkPairs = (items = [], size = 2) => {
  const result = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    result.push(chunk);
  }
  return result;
};

const InfoPairsTable = ({ rows = [] }) => {
  const styles = financesPdfStyles;
  const normalizedRows = rows
    .filter((row) => row && row.label)
    .map((row) => ({
      ...row,
      value:
        row.value === 0 || row.value === '0'
          ? '0'
          : row.value === null || row.value === undefined || row.value === ''
          ? '---'
          : row.value,
    }));

  if (!normalizedRows.length) {
    return null;
  }

  return (
    <View style={styles.table}>
      {chunkPairs(normalizedRows).map((pairRow, rowIndex) => (
        <View key={`pair-row-${rowIndex}`} style={styles.tableRow}>
          {pairRow.map((pair, cellIndex) => (
            <View
              key={`pair-cell-${rowIndex}-${cellIndex}`}
              style={[styles.tableCell, styles.metricCell, styles.pairCell]}
            >
              {pair ? (
                <>
                  <Text style={styles.infoLabel}>{pair.label}</Text>
                  <Text style={styles.infoValue}>{pair.value}</Text>
                </>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const PensionSection = ({ pensionData }) => {
  const styles = financesPdfStyles;
  if (!Array.isArray(pensionData) || !pensionData.length) {
    return null;
  }

  const [person] = pensionData;
  const generalRows = [
    { label: 'Անուն Ազգանուն', value: person?.full_name },
    { label: 'Ծննդյան օր', value: person?.birthdate },
    { label: 'Սոցիալական քարտ', value: person?.soc_card },
    { label: 'Աշխատանքային ստաժ', value: person?.Experience?.experience },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Կենսաթոշակային տվյալներ</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <Text style={styles.sectionHeading}>Ընդհանուր տվյալներ</Text>
        <InfoPairsTable rows={generalRows} />

        <Text style={styles.sectionHeading}>Կենսաթոշակների մանրամասներ</Text>
        {Array.isArray(person?.Pension) && person.Pension.length ? (
          person.Pension.map((item, index) => (
            <InfoPairsTable
              key={`pension-${index}`}
              rows={[
                { label: 'Տեսակ', value: item?.type },
                { label: 'Հիմք', value: item?.law },
                { label: 'Ամսական գումար', value: item?.sum ? `${item.sum} ֏` : '' },
                { label: 'Սկիզբ', value: item?.assign_date },
              ]}
            />
          ))
        ) : (
          <Text style={styles.emptyRow}>Մանրամասներ չկան</Text>
        )}
      </View>
    </View>
  );
};

const DisabilitySection = ({ data }) => {
  const styles = financesPdfStyles;
  if (!data) {
    return null;
  }

  const rows = [
    { label: 'Պատճառ', value: data?.disabilityCause },
    { label: 'Գնահատում', value: data?.disabilityScoreName },
    { label: 'Ժամկետ', value: data?.disabilityPeriodName },
    { label: 'Մինչև', value: data?.disabilityDateUntil },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Հաշմանդամության տվյալներ</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={rows} />
      </View>
    </View>
  );
};

const PyunikSection = ({ data }) => {
  const styles = financesPdfStyles;
  if (!data) {
    return null;
  }

  const rows = [
    { label: 'Պատճառ', value: data?.reason },
    { label: 'Խումբ', value: data?.invalid_group },
    { label: 'Սկիզբ', value: data?.start_date },
    { label: 'Վերջ', value: data?.end_date || 'Անժամկետ' },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Փյունիկ գրանցամատյան</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={rows} />
      </View>
    </View>
  );
};

const SocialPaymentsReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { ssn, pensionData, disabilityRegisterData, pyunikRegisterData } = data || {};
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';
  const hasData = Boolean(
    (Array.isArray(pensionData) && pensionData.length) ||
      disabilityRegisterData ||
      pyunikRegisterData
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Սոց. վճարումներ</Text>
          {ssn && <Text style={styles.subtitle}>ՀԾՀ {ssn}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {hasData ? (
            <>
              <PensionSection pensionData={pensionData} />
              <DisabilitySection data={disabilityRegisterData} />
              <PyunikSection data={pyunikRegisterData} />
            </>
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default SocialPaymentsReport;
