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
  return `${new Intl.NumberFormat('en-US').format(numeric)} ֏`;
};

const DebtorCard = ({ item, index }) => {
  const styles = financesPdfStyles;

  const generalRows = [
    { label: 'Գործի համարը', value: item?.cer_order_number },
    { label: 'Կատարողական վարույթի ID', value: item?.cer_inquest_id },
    { label: 'Վիճակ', value: item?.cer_inquest_status },
    { label: 'Դատարան', value: item?.cer_court_code },
    { label: 'Հայցվոր', value: item?.cer_inquest_plaintiff_name },
  ];

  const debtorRows = [
    { label: 'Պարտկալի անուն ազգանուն', value: item?.cer_debtor_full_name },
    { label: 'Հասցե', value: item?.cer_debtor_full_address },
  ];

  const amountRows = [
    { label: 'Կատարողական ծախսեր', value: formatAmountValue(item?.cer_inquest_charged_amount) },
    { label: 'Բռնագանձման գումար', value: formatAmountValue(item?.cer_inquest_recovered_amount) },
    { label: 'Հայցի գումար', value: formatAmountValue(item?.cer_inquest_claimed_amount) },
    { label: 'Վարույթի մնացորդ', value: formatAmountValue(item?.cer_inquest_remained_amount) },
    { label: 'Ալիմենտի գումար', value: formatAmountValue(item?.cer_inquest_aliment_amount) },
    { label: 'Տոկոսի հաշվարկ', value: item?.cer_inquest_calculated_percent },
  ];

  const datesRows = [
    { label: 'Պատվերի ամսաթիվ', value: item?.cer_order_date },
    { label: 'Վարույթի ամսաթիվ', value: item?.cer_inquest_date },
    { label: 'Փոփոխության ամսաթիվ', value: item?.cer_order_change_date },
    { label: 'Մուտքագրման ամսաթիվ', value: item?.cer_inquest_input_date },
    { label: 'Հոդված', value: item?.cer_order_change_article },
  ];

  return (
    <View key={`debtor-${index}`} style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>ԴԱՀԿ գործ #{item?.cer_order_number || index + 1}</Text>
        {item?.cer_inquest_status && <Text style={styles.employerMeta}>{item.cer_inquest_status}</Text>}
      </View>
      <View style={styles.propertySectionContent}>
        <Text style={styles.sectionHeading}>Ընդհանուր տվյալներ</Text>
        <InfoPairsTable rows={generalRows} />

        <Text style={styles.sectionHeading}>Պարտկալի տվյալներ</Text>
        <InfoPairsTable rows={debtorRows} />

        <Text style={styles.sectionHeading}>Գումարային տվյալներ</Text>
        <InfoPairsTable rows={amountRows} />

        <Text style={styles.sectionHeading}>Ամսաթվեր</Text>
        <InfoPairsTable rows={datesRows} />
      </View>
    </View>
  );
};

const MojCesDebtorReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { cases = [], psn, tax_id } = data || {};
  const reportData = Array.isArray(cases) ? cases : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';
  const identifier = psn || tax_id;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ԴԱՀԿ գործեր</Text>
          {identifier && <Text style={styles.subtitle}>{identifier}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length ? (
            reportData.map((item, index) => <DebtorCard key={`debtor-card-${index}`} item={item} index={index} />)
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MojCesDebtorReport;
