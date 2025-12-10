import { Document, Page, Text, View } from "@react-pdf/renderer";

import { financesPdfStyles } from "./templates.constants";
import { formatDate } from "./templates.helpers";
import registerPdfFonts from "./registerFonts";

registerPdfFonts();

const tableColumns = [
  { key: "name", label: "Հարկի տեսակը", align: "left" },
  { key: "liabilityAmount", label: "Գումար (֏)", align: "right" },
  { key: "fine", label: "Տուգանք", align: "right" },
  { key: "penalty", label: "Տույժ", align: "right" },
];

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

const formatValue = (value, { isCurrency = false } = {}) => {
  if (value === null || value === undefined || value === "") {
    return "---";
  }

  if (isCurrency) {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return value;
    }
    return `${new Intl.NumberFormat("en-US").format(numeric)} ֏`;
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return value;
};

const InfoPairsTable = ({ rows = [] }) => {
  const styles = financesPdfStyles;
  const normalizedRows = rows
    .filter((row) => row && row.label)
    .map((row) => ({
      ...row,
      value: formatValue(row.value),
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

const SectionCard = ({ title, children }) => {
  const styles = financesPdfStyles;

  if (!children) {
    return null;
  }

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>{title}</Text>
      </View>
      <View style={styles.propertySectionContent}>{children}</View>
    </View>
  );
};

const TaxTypesTable = ({ rows = [] }) => {
  const styles = financesPdfStyles;
  const normalizedRows = Array.isArray(rows) ? rows : [];

  if (!normalizedRows.length) {
    return <Text style={styles.emptyState}>Տվյալներ չկան</Text>;
  }

  return (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeaderRow]}>
        {tableColumns.map((column, index) => (
          <View
            key={column.key}
            style={[
              styles.tableCell,
              index === tableColumns.length - 1 && styles.lastCell,
            ]}
          >
            <Text style={[styles.headerText, column.align === "right" ? styles.cellText : styles.dateText]}>
              {column.label}
            </Text>
          </View>
        ))}
      </View>
      {normalizedRows.map((row, rowIndex) => (
        <View key={`tax-row-${rowIndex}`} style={styles.tableRow}>
          {tableColumns.map((column, colIndex) => (
            <View
              key={`${column.key}-${rowIndex}`}
              style={[
                styles.tableCell,
                colIndex === tableColumns.length - 1 && styles.lastCell,
              ]}
            >
              <Text
                style={
                  column.align === "right"
                    ? styles.cellText
                    : styles.dateText
                }
              >
                {column.key === "name"
                  ? formatValue(row[column.key])
                  : formatValue(row[column.key], { isCurrency: true })}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const TaxObligationsReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const {
    taxInfo = {},
    declInfo = {},
    taxPayerInfo = {},
    singleAccountPayments = {},
  } = data || {};
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || "").trim() || "---";

  const taxpayerRows = [
    { label: "Անուն", value: taxPayerInfo?.taxpayerName },
    { label: "ՀՎՀՀ", value: taxPayerInfo?.tin },
  ];

  const balanceRows = [
    {
      label: "Ընդհանուր մնացորդ",
      value: formatValue(taxInfo?.totalBalance, { isCurrency: true }),
    },
    {
      label: "Մեկ միասնական հաշվից",
      value: formatValue(taxInfo?.singleAccountBalance, { isCurrency: true }),
    },
    { label: "Վերջին թարմացում", value: taxInfo?.responseDate },
  ];

  const declarationRows = [
    { label: "ԱԱՀ", value: declInfo?.vatTaxDeclInfo },
    { label: "Շրջանառության հարկ", value: declInfo?.turnoverTaxDeclInfo },
    {
      label: "Ընդհանուր շրջանառություն",
      value: declInfo?.totalTurnoverActivitiesDeclInfo,
    },
    {
      label: "Շահութահարկ",
      value: declInfo?.profitTaxDeclInfo?.profitForReportingPeriod,
    },
  ];

  const paymentRows = [
    {
      label: "Ընդամենը վճարված",
      value: formatValue(singleAccountPayments?.amount, { isCurrency: true }),
    },
    {
      label: "Ժամանակահատված",
      value: [
        singleAccountPayments?.fromDate || "---",
        singleAccountPayments?.toDate || "---",
      ].join(" → "),
    },
  ];

  const taxRows = Array.isArray(taxInfo?.taxTypeList)
    ? taxInfo.taxTypeList
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ՊԵԿ պարտավորությունների հաշվետվություն</Text>
          {taxPayerInfo?.tin && (
            <Text style={styles.subtitle}>ՀՎՀՀ {taxPayerInfo.tin}</Text>
          )}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          <SectionCard title="Հարկ վճարող">
            <InfoPairsTable rows={taxpayerRows} />
          </SectionCard>
          <SectionCard title="Մնացորդներ">
            <InfoPairsTable rows={balanceRows} />
          </SectionCard>
          <SectionCard title="Հարկերի տեսակներ">
            <TaxTypesTable rows={taxRows} />
          </SectionCard>
          <SectionCard title="Հայտարարագրային տվյալներ">
            <InfoPairsTable rows={declarationRows} />
          </SectionCard>
          <SectionCard title="Վճարումներ">
            <InfoPairsTable rows={paymentRows} />
          </SectionCard>
        </View>
      </Page>
    </Document>
  );
};

export default TaxObligationsReport;
