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

const formatAmountValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return '---';
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return value;
  }
  return new Intl.NumberFormat('en-US').format(numeric);
};

const BeneficiaryCard = ({ data, index }) => {
  const styles = financesPdfStyles;
  const rows = [
    { label: 'Տիպ', value: data?.type },
    { label: 'Պարտք', value: formatAmountValue(data?.debt) },
    { label: 'Գումար', value: formatAmountValue(data?.amount) },
    { label: 'Գերավճար', value: data?.overpay },
    { label: 'Սկիզբ', value: data?.start_date },
    { label: 'Վերջ', value: data?.end_date },
  ];

  return (
    <View key={`beneficiary-${index}`} style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Շահառու #{index + 1}</Text>
        {data?.type && <Text style={styles.employerMeta}>{data.type}</Text>}
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={rows} />
      </View>
    </View>
  );
};

const MojCivilBeneficiaryReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { psn, beneficiaries } = data || {};
  const reportData = Array.isArray(beneficiaries) ? beneficiaries : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Շահառուի տվյալներ</Text>
          {psn && <Text style={styles.subtitle}>ՀԾՀ {psn}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length ? (
            reportData.map((caseItem, index) => (
              <BeneficiaryCard data={caseItem} index={index} key={`beneficiary-card-${index}`} />
            ))
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MojCivilBeneficiaryReport;
