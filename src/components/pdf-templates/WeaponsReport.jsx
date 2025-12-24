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

const formatAddress = (row = {}) =>
  [row.HASCE, row.ABNAK, row.APOXOC, row.ASHENQ, row.ABNAKARAN]
    .filter(Boolean)
    .join(', ');

const formatOwnerFullName = (row = {}) =>
  [row.ANUN, row.AZG, row.HAYR].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();

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
            rows.map((weapon, index) => {
              const generalRows = [
                { label: 'Հերթական համար', value: weapon?.ZHAMAR },
                { label: 'Զենքի անվանում', value: weapon?.ZANUN_NAME },
                { label: 'Տեսակ', value: weapon?.ZTYPE_NAME },
                { label: 'Տ/չ', value: weapon?.KALIBR },
                { label: 'Պատկանում է', value: weapon?.ZPATK1_NAME },
              ];

              const permitRows = [
                { label: 'Թույլտվության տ/կ', value: weapon?.TTYPE_NAME },
                { label: 'Թույլտվության ա/թ', value: weapon?.TDATE },
                { label: 'Գրանցված է', value: weapon?.GRANC_NAME },
                { label: 'Բաժինը', value: weapon?.TBAJIN },
              ];

              const ownerRows = [
                { label: 'ԱԱՀ', value: formatOwnerFullName(weapon) },
                { label: 'Փաստաթուղթ', value: weapon?.PASSPORT },
                { label: 'Ծննդ. ա/թ', value: weapon?.BDATE },
                { label: 'ՀԾՀ / ՀՎՀՀ', value: weapon?.SSN },
              ];

              const addressRows = [{ label: 'Հասցե', value: formatAddress(weapon) }];

              return (
                <View key={`weapon-${index}`} style={styles.employerSection}>
                  <View style={styles.employerHeader}>
                    <Text style={styles.employerTitle}>Զենք #{weapon?.ZHAMAR || index + 1}</Text>
                    {weapon?.ZANUN_NAME && (
                      <Text style={styles.employerMeta}>{weapon.ZANUN_NAME}</Text>
                    )}
                  </View>
                  <View style={styles.propertySectionContent}>
                    <Text style={styles.sectionHeading}>Ընդհանուր տվյալներ</Text>
                    <InfoPairsTable rows={generalRows} />

                    <Text style={styles.sectionHeading}>Թույլտվություն</Text>
                    <InfoPairsTable rows={permitRows} />

                    <Text style={styles.sectionHeading}>Սեփականատեր / գրանցվող անձ</Text>
                    <InfoPairsTable rows={ownerRows} />

                    <Text style={styles.sectionHeading}>Հասցե</Text>
                    <InfoPairsTable rows={addressRows} />
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default WeaponsReport;
