import { Document, Page, Text, View } from "@react-pdf/renderer";

import { financesPdfStyles } from "./templates.constants";
import { formatDate } from "./templates.helpers";
import registerPdfFonts from "./registerFonts";

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

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "---";
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return `${value}`;
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

const PositionsSection = ({ positions = [] }) => {
  const styles = financesPdfStyles;
  const positionsList = Array.isArray(positions) ? positions : [];

  if (!positionsList.length) {
    return <Text style={styles.emptyState}>Դրույքներ չկան</Text>;
  }

  return (
    <View style={styles.list}>
      {positionsList.map((position, index) => (
        <View key={`position-${index}`} style={styles.list}>
          <Text style={styles.listItem}>{position?.positionname || "---"}</Text>
          <Text style={styles.infoLabel}>
            {(position?.startdate || "---") + " → " + (position?.enddate || "Հիմա")}
          </Text>
        </View>
      ))}
    </View>
  );
};

const EmployeeSection = ({ employee }) => {
  const styles = financesPdfStyles;
  const { personalinfo = {}, positions = [], isActiveEmployee } = employee || {};
  const { firstname, lastname, birthdate, ssn } = personalinfo || {};
  const fullName = [firstname, lastname].filter(Boolean).join(" ");

  const rows = [
    { label: "Անուն", value: firstname },
    { label: "Ազգանուն", value: lastname },
    { label: "Ծննդյան ա/թ", value: birthdate },
    { label: "ՀԾՀ", value: ssn },
    {
      label: "Կարգավիճակ",
      value: isActiveEmployee ? "Ակտիվ" : "Ոչ ակտիվ",
    },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>{fullName || "Անհայտ աշխատակից"}</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={rows} />
        <View style={{ marginTop: 8 }}>
          <Text style={styles.sectionHeading}>Դրույքներ</Text>
          <PositionsSection positions={positions} />
        </View>
      </View>
    </View>
  );
};

const TaxEmployeesReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { employees = [], taxId, filterLabel } = data || {};
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || "").trim() || "---";
  const normalizedEmployees = Array.isArray(employees) ? employees : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Աշխատակիցների հաշվետվություն</Text>
          {taxId && <Text style={styles.subtitle}>ՀՎՀՀ {taxId}</Text>}
          {filterLabel && <Text style={styles.meta}>Ֆիլտր՝ {filterLabel}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {normalizedEmployees.length ? (
            normalizedEmployees.map((employee, index) => (
              <EmployeeSection employee={employee} key={`employee-${index}`} />
            ))
          ) : (
            <Text style={styles.emptyState}>Աշխատակիցներ չեն գտնվել</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default TaxEmployeesReport;
