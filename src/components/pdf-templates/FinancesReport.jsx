import { Document, Page, Text, View } from '@react-pdf/renderer';

import { financesPdfStyles } from './templates.constants';
import { formatDate } from './templates.helpers';
import registerPdfFonts from './registerFonts';

registerPdfFonts();

const metricsConfig = [
  { key: 'salaryEquivPayments', label: 'Աշխատավարձին հավասարեցված վճարներ' },
  { key: 'civilLowContractPayments', label: 'Քաղպայմանագիր' },
  { key: 'incomeTax', label: 'Եկամտային հարկ' },
  { key: 'socialpayments', label: 'Հաշվարկված սոցվճարներ' },
  { key: 'socialpaymentspaid', label: 'Վճարված սոցվճարներ' },
  { key: 'workinghours', label: 'Աշխատաժամեր' },
];

const initialTotals = metricsConfig.reduce((acc, metric) => ({ ...acc, [metric.key]: 0 }), {});

const normalizePeriods = (personInfoPeriods) => {
  const { personInfoPeriod } = { ...personInfoPeriods };
  if (!personInfoPeriod) {
    return [];
  }

  return Array.isArray(personInfoPeriod) ? personInfoPeriod : [personInfoPeriod];
};

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return '-';
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return value.toString();
  }

  return new Intl.NumberFormat('en-US').format(numericValue);
};

const calculateTotals = (periods = []) =>
  periods.reduce(
    (acc, { personInfo = {} }) => {
      metricsConfig.forEach(({ key }) => {
        const value = Number(personInfo[key]) || 0;
        acc[key] += value;
      });
      return acc;
    },
    { ...initialTotals }
  );

const EmployerSection = ({ employer }) => {
  const styles = financesPdfStyles;
  const { taxpayerid, taxpayerName, legalTypeName, personInfoPeriods } = employer || {};

  const periods = normalizePeriods(personInfoPeriods);
  const hasPeriods = periods.length > 0;
  const displayName = [taxpayerName, legalTypeName].filter(Boolean).join(' ').trim();
  const totals = calculateTotals(periods);

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>{displayName || 'Չսահմանված գործատու'}</Text>
        {taxpayerid && <Text style={styles.employerMeta}>ՀՎՀՀ: {taxpayerid}</Text>}
      </View>
      {hasPeriods ? (
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <View style={[styles.tableCell, styles.dateCell]}>
              <Text style={[styles.headerText, styles.dateText]}>Ամիս</Text>
            </View>
            {metricsConfig.map((metric, index) => (
              <View
                key={metric.key}
                style={[
                  styles.tableCell,
                  styles.metricCell,
                  index === metricsConfig.length - 1 && styles.lastCell,
                ]}
              >
                <Text style={[styles.headerText, styles.cellText]}>{metric.label}</Text>
              </View>
            ))}
          </View>
          {periods.map(({ date, personInfo = {} }, rowIndex) => (
            <View key={`${taxpayerid || 'tax'}-${date}-${rowIndex}`} style={styles.tableRow}>
              <View style={[styles.tableCell, styles.dateCell]}>
                <Text style={styles.dateText}>{date || '-'}</Text>
              </View>
              {metricsConfig.map((metric, index) => (
                <View
                  key={`${metric.key}-${rowIndex}`}
                  style={[
                    styles.tableCell,
                    styles.metricCell,
                    index === metricsConfig.length - 1 && styles.lastCell,
                  ]}
                >
                  <Text style={styles.cellText}>{formatValue(personInfo?.[metric.key])}</Text>
                </View>
              ))}
            </View>
          ))}
          <View style={[styles.tableRow, styles.totalRow]}>
            <View style={[styles.tableCell, styles.dateCell, styles.noBottomBorder]}>
              <Text style={[styles.dateText, styles.totalText]}>Ընդամենը</Text>
            </View>
            {metricsConfig.map((metric, index) => (
              <View
                key={`total-${metric.key}`}
                style={[
                  styles.tableCell,
                  styles.metricCell,
                  styles.noBottomBorder,
                  index === metricsConfig.length - 1 && styles.lastCell,
                ]}
              >
                <Text style={[styles.cellText, styles.totalText]}>
                  {formatValue(totals[metric.key])}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.emptyRow}>Տվյալներ չեն գտնվել</Text>
      )}
    </View>
  );
};

const FinancesReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { PNum, employers } = data || {};
  const reportData = Array.isArray(employers) ? employers : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Անձի եկամուտների տվյալներ</Text>
          {PNum && <Text style={styles.subtitle}>ՀԾՀ {PNum}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length > 0 ? (
            reportData.map((employer, index) => (
              <EmployerSection key={`${employer?.taxpayerid || index}`} employer={employer} />
            ))
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default FinancesReport;
