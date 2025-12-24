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

const formatOwner = (person = {}) => {
  const fullName = [person.first_name, person.middle_name, person.last_name]
    .filter(Boolean)
    .join(' ') || '---';

  const baseInfo = [
    { label: 'Անուն Ազգանուն', value: fullName },
    { label: 'ՀԾՀ', value: person.ssn },
    { label: 'Փաստաթուղթ', value: person.identification_no },
    { label: 'Քաղաքացիություն', value: person.nationality },
    { label: 'Սկիզբ', value: person.joined_date },
    { label: 'Ավարտ', value: person.left_date },
    {
      label: 'Հեռախոս',
      value: person.address?.mobile || person.address?.phone,
    },
    {
      label: 'Հասցե',
      value: [
        person.address?.street1,
        person.address?.house,
        person.address?.community,
        person.address?.province,
      ]
        .filter(Boolean)
        .join(', '),
    },
  ];

  return baseInfo;
};

const formatPrice = (price, currency) => {
  if (!price) {
    return '';
  }
  const numeric = Number(price.replace(/[^0-9.-]/g, ''));
  const formatted = Number.isNaN(numeric)
    ? price
    : new Intl.NumberFormat('en-US').format(numeric);
  return `${formatted} ${currency || ''}`.trim();
};

const VehicleChipList = ({ chips = [] }) => {
  const styles = financesPdfStyles;
  if (!chips.length) {
    return null;
  }

  return (
    <View style={styles.chipList}>
      {chips.map((chip, index) => (
        <Text key={`chip-${index}`} style={styles.chip}>
          {chip}
        </Text>
      ))}
    </View>
  );
};

const OwnersSection = ({ title, owners = [] }) => {
  if (!owners.length) {
    return null;
  }
  const styles = financesPdfStyles;
  return (
    <View>
      <Text style={styles.sectionHeading}>{title}</Text>
      {owners.map((owner, index) => (
        <View key={`owner-${index}`} style={styles.employerSection}>
          <View style={styles.propertySectionContent}>
            <InfoPairsTable rows={formatOwner(owner)} />
          </View>
        </View>
      ))}
    </View>
  );
};

const TransactionCard = ({ transaction, index }) => {
  const styles = financesPdfStyles;
  const chipValues = [
    transaction.vehicle_type,
    transaction.reason_type,
    formatPrice(transaction.price, transaction.currency),
    transaction.engine_hp ? `${transaction.engine_hp} HP` : null,
    transaction.fuel_type,
  ].filter(Boolean);

  const vehicleRows = [
    { label: 'Մոդել', value: transaction.model },
    { label: 'Թողարկման տարեթիվ', value: transaction.released },
    { label: 'VIN', value: transaction.vin },
    { label: 'Գույն', value: transaction.color },
    { label: 'Համարանիշ', value: transaction.number || transaction.old_number },
    { label: 'Վկայականի համար', value: transaction.cert_num },
    { label: 'Գրանցման ա/թ', value: transaction.recording_date },
    { label: 'Փոփոխության անուն', value: transaction.changeset_name },
  ];

  return (
    <View key={`transaction-${index}`} style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>
          Տրանսակցիա {transaction.model || transaction.number || ''}
        </Text>
        {transaction.released && (
          <Text style={styles.employerMeta}>Թողարկման տարեթիվ {transaction.released}</Text>
        )}
      </View>
      <View style={styles.propertySectionContent}>
        <VehicleChipList chips={chipValues} />

        <Text style={styles.sectionHeading}>Տրանսպորտային միջոցի տվյալներ</Text>
        <InfoPairsTable rows={vehicleRows} />

        <OwnersSection title="Նոր սեփականատերեր" owners={transaction.persons?.new || []} />
        <OwnersSection title="Նախկին սեփականատերեր" owners={transaction.persons?.old || []} />
      </View>
    </View>
  );
};

const RoadPoliceTransactionsReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { PNum, transactions } = data || {};
  const reportData = Array.isArray(transactions?.items) ? transactions.items : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ՃՈ հաշվառումներ</Text>
          {PNum && <Text style={styles.subtitle}>ՀԾՀ {PNum}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length ? (
            reportData.map((transaction, index) => (
              <TransactionCard transaction={transaction} index={index} key={`card-${index}`} />
            ))
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default RoadPoliceTransactionsReport;
