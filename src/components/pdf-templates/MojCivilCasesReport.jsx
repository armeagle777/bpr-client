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

const stripHtml = (html = '') => {
  if (!html) {
    return '';
  }
  return html.replace(/<br\s*\/?>(\r?\n)?/gi, '\n').replace(/<[^>]*>/g, '').trim();
};

const CaseCard = ({ caseItem, index }) => {
  const styles = financesPdfStyles;
  const generalRows = [
    { label: 'Գործի համար', value: caseItem?.case_number },
    { label: 'Դատարան', value: caseItem?.court },
  ];

  return (
    <View key={`case-${index}`} style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Դատական գործ № {caseItem?.case_number || index + 1}</Text>
        {caseItem?.court && <Text style={styles.employerMeta}>{caseItem.court}</Text>}
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={generalRows} />

        <Text style={styles.sectionHeading}>Դատավորներ</Text>
        <Text style={styles.listItem}>{stripHtml(caseItem?.judge)}</Text>

        <Text style={styles.sectionHeading}>Գործի կողմեր</Text>
        <Text style={styles.listItem}>{stripHtml(caseItem?.case_sides)}</Text>
      </View>
    </View>
  );
};

const MojCivilCasesReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { psn, cases } = data || {};
  const reportData = Array.isArray(cases) ? cases : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Քաղաքացիական գործեր</Text>
          {psn && <Text style={styles.subtitle}>ՀԾՀ {psn}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length ? (
            reportData.map((caseItem, index) => (
              <CaseCard caseItem={caseItem} index={index} key={`case-card-${index}`} />
            ))
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MojCivilCasesReport;
