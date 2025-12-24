import { Document, Page, Text, View } from '@react-pdf/renderer';

import { financesPdfStyles } from './templates.constants';
import registerPdfFonts from './registerFonts';
import { formatDate } from './templates.helpers';
import { decisionReceivedDetailsMap } from '../RoadPoliceViolationsTab/RoadPoliceViolationsTab.constants';

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
  if (!value && value !== 0) {
    return '';
  }
  const numeric = Number(String(value).replace(/[^0-9.-]/g, ''));
  if (Number.isNaN(numeric)) {
    return value;
  }
  return new Intl.NumberFormat('en-US').format(numeric);
};

const formatBoolean = (value) => (value ? 'Այո' : 'Ոչ');

const VehicleChipList = ({ chips = [] }) => {
  const styles = financesPdfStyles;
  if (!chips.length) {
    return null;
  }

  return (
    <View style={styles.chipList}>
      {chips.map((chip, index) => (
        <Text key={`viol-chip-${index}`} style={styles.chip}>
          {chip}
        </Text>
      ))}
    </View>
  );
};

const ViolationCard = ({ violation, index }) => {
  const styles = financesPdfStyles;
  const speedValue = Number(violation?.rp_violation_speed || 0);
  const isHighSpeed =
    violation?.rp_violation_type === 'speed' && Number.isFinite(speedValue) && speedValue > 60;

  const chipValues = [
    violation?.rp_violation_status_name,
    isHighSpeed ? 'Խիստ արագություն' : null,
    violation?.rp_violation_type,
  ].filter(Boolean);

  const generalRows = [
    { label: 'Տրանսպորտային միջոց', value: violation?.vehicle_number },
    { label: 'Մոդել', value: violation?.rp_violator_vehicle_model },
    { label: 'Խախտող', value: violation?.rp_violator_fullname },
    { label: 'Վայր', value: violation?.rp_violation_address },
    {
      label: 'Խախտման ա/թ',
      value: (violation?.rp_violation_date || '').split(' ')[0] || violation?.rp_violation_date,
    },
    { label: 'Արագություն', value: violation?.rp_violation_speed },
    { label: 'Տուգանային միավոր', value: violation?.rp_violation_point },
    { label: 'Փակված է', value: formatBoolean(violation?.rp_violation_closed) },
  ];

  const violationInfoRows = [
    { label: 'Հոդված', value: violation?.rp_violation_type_article },
    { label: 'Կետ', value: violation?.rp_violation_type_part },
    { label: 'Մաս', value: violation?.rp_violation_type_prim },
    { label: 'Տեսակ', value: violation?.rp_violation_type },
  ];

  const paymentRows = [
    { label: 'Պահանջվող գումար', value: formatAmountValue(violation?.rp_violation_requested_sum) },
    { label: 'Տուգանքի գումար', value: formatAmountValue(violation?.rp_violation_fine_sum) },
    { label: 'Բռնագանձման գումար', value: formatAmountValue(violation?.rp_violation_payable_sum) },
    { label: 'Վճարված գումար', value: formatAmountValue(violation?.rp_violation_payed_sum) },
  ];

  const decisionRows = [
    { label: 'Որոշման N', value: violation?.rp_decision_id },
    { label: 'Որոշման ա/թ', value: violation?.rp_decision_date },
    { label: 'Տեղեկացման օր', value: violation?.rp_decision_received_date },
    {
      label: 'Տեղեկացման տվյալներ',
      value: decisionReceivedDetailsMap?.[violation?.rp_decision_received_detail],
    },
    { label: 'Բանկային հաշիվ', value: violation?.rp_violation_bank_account },
    { label: 'Փաստաթուղթ', value: violation?.rp_decision_pin },
  ];

  const additionalRows = [
    { label: 'Խախտողի հասցե', value: violation?.rp_violator_address },
    { label: 'ՀԾՀ', value: violation?.psn },
    { label: 'Վարորդական վկայական', value: violation?.vehicle_owner_certificate_number },
    { label: 'Խախտման արձանագրող', value: violation?.rp_violation_reporter },
  ];

  const extraDatesRows = [
    { label: 'Առաքման ա/թ', value: violation?.posted_date },
    { label: 'Վճարման ա/թ', value: violation?.payment_date },
    { label: 'Ծանուցման ա/թ', value: violation?.rp_violation_delivery_date },
    { label: 'Ազդարարի ա/թ', value: violation?.rp_violation_azdarar_send_date },
  ];

  return (
    <View key={`violation-${index}`} style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>
          Խախտում {violation?.vehicle_number || violation?.rp_violation_id || ''}
        </Text>
        {violation?.rp_violator_fullname && (
          <Text style={styles.employerMeta}>{violation.rp_violator_fullname}</Text>
        )}
      </View>
      <View style={styles.propertySectionContent}>
        <VehicleChipList chips={chipValues} />

        <Text style={styles.sectionHeading}>Ընդհանուր տվյալներ</Text>
        <InfoPairsTable rows={generalRows} />

        <Text style={styles.sectionHeading}>Խախտման բնութագիր</Text>
        <InfoPairsTable rows={violationInfoRows} />

        <Text style={styles.sectionHeading}>Վճարային տվյալներ</Text>
        <InfoPairsTable rows={paymentRows} />

        <Text style={styles.sectionHeading}>Որոշման տվյալներ</Text>
        <InfoPairsTable rows={decisionRows} />

        <Text style={styles.sectionHeading}>Քաղաքացիի տվյալներ</Text>
        <InfoPairsTable rows={additionalRows} />

        <Text style={styles.sectionHeading}>Լրացուցիչ օրեր</Text>
        <InfoPairsTable rows={extraDatesRows} />
      </View>
    </View>
  );
};

const RoadPoliceViolationsReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { PNum, violations } = data || {};
  const reportData = Array.isArray(violations) ? violations : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ՃՈ Տուգանքներ</Text>
          {PNum && <Text style={styles.subtitle}>ՀԾՀ {PNum}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length ? (
            reportData.map((violation, index) => (
              <ViolationCard violation={violation} index={index} key={`violation-card-${index}`} />
            ))
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default RoadPoliceViolationsReport;
