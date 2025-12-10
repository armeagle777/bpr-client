import { Document, Page, Text, View } from '@react-pdf/renderer';

import { financesPdfStyles } from './templates.constants';
import registerPdfFonts from './registerFonts';
import { formatDate } from './templates.helpers';

registerPdfFonts();

const weaponColumns = [
  { key: 'ZHAMAR', title: 'Հերթ. համար' },
  { key: 'ZANUN_NAME', title: 'Անունը' },
  { key: 'ZTYPE_NAME', title: 'Տեսակը' },
  { key: 'HASCE', title: 'Հասցե' },
  { key: 'PASSPORT', title: 'Փաստաթուղթ' },
  { key: 'TTYPE_NAME', title: 'Թույլտվության տ/կ' },
  { key: 'TDATE', title: 'Թույլտվության ա/թ' },
  { key: 'ZPATK1_NAME', title: 'Պատկանում է' },
  { key: 'GRANC_NAME', title: 'Գրանցված է' },
  { key: 'TBAJIN', title: 'Բաժինը' },
  { key: 'AZG', title: 'ԱԱՀ' },
  { key: 'BDATE', title: 'Ծննդ. ա/թ' },
  { key: 'SSN', title: 'ՀԾՀ / ՀՎՀՀ' },
  { key: 'KALIBR', title: 'Տ/չ' },
];

const formatAddress = (row = {}) =>
  [row.HASCE, row.ABNAK, row.APOXOC, row.ASHENQ, row.ABNAKARAN]
    .filter(Boolean)
    .join(', ');

const formatOwner = (row = {}) => [row.ANUN, row.AZG, row.HAYR].filter(Boolean).join(' ');

const formatCellValue = (row, key) => {
  if (key === 'HASCE') {
    return formatAddress(row);
  }
  if (key === 'AZG') {
    return formatOwner(row);
  }
  return row?.[key] || '---';
};

const WeaponsReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { PNum, taxId, weapons } = data || {};
  const rows = Array.isArray(weapons) ? weapons : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Զենքերի հաշվառման տվյալներ</Text>
          {PNum && <Text style={styles.subtitle}>ՀԾՀ {PNum}</Text>}
          {taxId && <Text style={styles.subtitle}>ՀՎՀՀ {taxId}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {rows.length ? (
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeaderRow]}>
                {weaponColumns.map((col, index) => (
                  <View
                    key={col.key}
                    style={[
                      styles.tableCell,
                      styles.metricCell,
                      index === weaponColumns.length - 1 && styles.lastCell,
                    ]}
                  >
                    <Text style={[styles.headerText, styles.cellText]}>{col.title}</Text>
                  </View>
                ))}
              </View>
              {rows.map((weapon, rowIndex) => (
                <View key={`weapon-${rowIndex}`} style={styles.tableRow}>
                  {weaponColumns.map((col, colIndex) => (
                    <View
                      key={`${col.key}-${rowIndex}`}
                      style={[
                        styles.tableCell,
                        styles.metricCell,
                        colIndex === weaponColumns.length - 1 && styles.lastCell,
                      ]}
                    >
                      <Text style={styles.cellText}>{formatCellValue(weapon, col.key)}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default WeaponsReport;
