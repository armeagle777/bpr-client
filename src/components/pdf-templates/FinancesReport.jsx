import { Document, Font, Page, Text, View } from "@react-pdf/renderer";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import { financesPdfStyles } from "./templates.constants";
import { formatDate } from "./templates.helpers";

Font.register({
  family: "Arial",
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [
    {
      src: Arial,
    },
    {
      src: BoldArial,
      fontWeight: "bold",
    },
  ],
});

const metricsConfig = [
  { key: "salaryEquivPayments", label: "Աշխ․ հավասարեցված վճարներ" },
  { key: "civilLowContractPayments", label: "Քաղ. պայմ" },
  { key: "incomeTax", label: "Եկամտային հարկ" },
  { key: "socialpayments", label: "Հաշվարկված սոց․ վճարներ" },
  { key: "socialpaymentspaid", label: "Վճարված սոցվճարներ" },
  { key: "workinghours", label: "Աշխատաժամեր" },
];

const normalizePeriods = (personInfoPeriods) => {
  const { personInfoPeriod } = { ...personInfoPeriods };
  if (!personInfoPeriod) {
    return [];
  }

  return Array.isArray(personInfoPeriod) ? personInfoPeriod : [personInfoPeriod];
};

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return "-";
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return value.toString();
  }

  return new Intl.NumberFormat("en-US").format(numericValue);
};

const EmployerSection = ({ employer }) => {
  const styles = financesPdfStyles;
  const {
    taxpayerid,
    taxpayerName,
    legalTypeName,
    personInfoPeriods,
  } = employer || {};

  const periods = normalizePeriods(personInfoPeriods);
  const dates = periods.map(({ date }) => date);
  const hasPeriods = periods.length > 0;
  const displayName = [taxpayerName, legalTypeName].filter(Boolean).join(" ").trim();

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>
          {displayName || "Չսահմանված գործատու"}
        </Text>
        {taxpayerid && <Text style={styles.employerMeta}>ՀՎՀՀ: {taxpayerid}</Text>}
      </View>
      {hasPeriods ? (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.cell, styles.labelCell, styles.headerCell]}>
              <Text>...</Text>
            </View>
            {dates.map((date, index) => (
              <View
                key={`${taxpayerid || "tax"}-${date}-${index}`}
                style={[
                  styles.cell,
                  styles.headerCell,
                  styles.valueCell,
                  index === dates.length - 1 && styles.lastCell,
                ]}
              >
                <Text>{date}</Text>
              </View>
            ))}
          </View>
          {metricsConfig.map((metric, metricIndex) => (
            <View key={metric.key} style={styles.tableRow}>
              <View
                style={[
                  styles.cell,
                  styles.labelCell,
                  metricIndex === metricsConfig.length - 1 && styles.noBottomBorder,
                ]}
              >
                <Text>{metric.label}</Text>
              </View>
              {periods.map(({ personInfo = {} }, valueIndex) => (
                <View
                  key={`${metric.key}-${valueIndex}`}
                  style={[
                    styles.cell,
                    styles.valueCell,
                    valueIndex === periods.length - 1 && styles.lastCell,
                    metricIndex === metricsConfig.length - 1 && styles.noBottomBorder,
                  ]}
                >
                  <Text style={styles.valueCellText}>
                    {formatValue(personInfo?.[metric.key])}
                  </Text>
                </View>
              ))}
            </View>
          ))}
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
  const exporterName = (userFullName || "").trim() || "---";

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
        <View style={styles.footer}>
          <Text>Աղբյուր՝ ԲՊՌ</Text>
          <Text>Գաղտնիություն ապահովված է իրավական ակտերով</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FinancesReport;
