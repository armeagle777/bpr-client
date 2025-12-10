import { Document, Page, Text, View } from '@react-pdf/renderer';

import { financesPdfStyles } from './templates.constants';
import registerPdfFonts from './registerFonts';
import { formatDate } from './templates.helpers';
import { companyDocumentNames } from '../../utils/constants';

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

const ExecutiveCard = ({ executive = {}, sole_proprietor = {} }) => {
  const styles = financesPdfStyles;
  const person = Object.keys(executive || {}).length ? executive : sole_proprietor;
  if (!person) {
    return null;
  }
  const { ssn, full_name, exec_position, id_info = {}, address = {} } = person || {};
  const rows = [
    { label: 'Անուն Ազգանուն', value: full_name },
    { label: 'Պաշտոն', value: exec_position || 'Անհատ ձեռնարկատեր' },
    { label: 'ՀԾՀ', value: id_info?.ssn || ssn },
    { label: 'Անձնագիր', value: id_info?.passport_no },
    { label: 'Ծննդյան ա/թ', value: id_info?.birth_date },
    { label: 'Հեռախոս', value: address?.phone || address?.mobile },
    { label: 'Հասցե', value: address?.addr_descr },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Ղեկավար</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={rows} />
      </View>
    </View>
  );
};

const OwnerCard = ({ ownerInfo = {}, index }) => {
  const styles = financesPdfStyles;
  const {
    full_name,
    is_founder,
    is_legal_entity,
    address = {},
    id_info = {},
    shares,
    share_info = {},
    joined_date,
    left_date,
  } = ownerInfo;

  const rows = [
    { label: 'Անուն Ազգանուն', value: full_name },
    { label: 'Ստատուս', value: [is_founder ? 'Հիմնադիր' : null, is_legal_entity ? 'Իրավաբանական անձ' : null].filter(Boolean).join(', ') },
    { label: 'Հասցե', value: address?.addr_descr },
    { label: 'Էլ. փոստ', value: address?.email },
    { label: 'Հեռախոս', value: address?.mobile || address?.phone },
    { label: 'Վեբ', value: address?.website },
    { label: 'ՀԾՀ', value: id_info?.ssn || id_info?.taxid },
    { label: 'Անձնագրի համար', value: id_info?.passport_no },
    { label: 'Ծննդյան ա/թ', value: id_info?.birth_date },
    { label: 'Բաժնեմաս', value: shares || share_info?.share_percent },
    {
      label: 'Միանալու / Հեռանալու ամսաթիվ',
      value: [joined_date || '-', left_date && left_date !== '0000-00-00' ? left_date : '-'].join(' / '),
    },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Բաժնետեր #{index + 1}</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={rows} />
      </View>
    </View>
  );
};

const DocumentsSection = ({ docs = {} }) => {
  const styles = financesPdfStyles;
  const documentKeys = Object.keys(docs || {}).filter((docKey) => docs[docKey]);

  if (!documentKeys.length) {
    return null;
  }

  const rows = documentKeys.map((docKey) => ({
    label: companyDocumentNames[docKey]?.title || companyDocumentNames.unknown.title,
    value: 'Կցված է',
  }));

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Փաստաթղթեր</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={rows} />
      </View>
    </View>
  );
};

const CompanyMainReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { taxid, executive, sole_proprietor, owners, docs } = data || {};
  const ownersList = Array.isArray(owners) ? owners : Object.values(owners || {});
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Ընկերության տվյալներ</Text>
          {taxid && <Text style={styles.subtitle}>ՀՎՀՀ {taxid}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          <ExecutiveCard executive={executive} sole_proprietor={sole_proprietor} />
          {ownersList.length ? (
            ownersList.map((owner, index) => (
              <OwnerCard ownerInfo={owner} index={index} key={`owner-${index}`} />
            ))
          ) : (
            <Text style={styles.emptyState}>Բաժնետերերի տվյալներ չկան</Text>
          )}
          <DocumentsSection docs={docs} />
        </View>
      </Page>
    </Document>
  );
};

export default CompanyMainReport;
