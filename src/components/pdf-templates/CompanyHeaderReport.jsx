import { Document, Page, Text, View } from "@react-pdf/renderer";

import { financesPdfStyles } from "./templates.constants";
import { formatDate, reformatDate } from "./templates.helpers";
import registerPdfFonts from "./registerFonts";
import { activityCodes } from "../../utils/industryCodes";

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
        row.value === 0 || row.value === "0"
          ? "0"
          : row.value === null || row.value === undefined || row.value === ""
          ? "---"
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

const SectionCard = ({ title, rows = [] }) => {
  const styles = financesPdfStyles;
  const validRows = rows.filter((row) => row && row.label);

  if (!validRows.length) {
    return null;
  }

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>{title}</Text>
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={validRows} />
      </View>
    </View>
  );
};

const formatCapital = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return value;
  }
  return `${new Intl.NumberFormat("en-US").format(numeric)} ֏`;
};

const formatRegisteredDate = (dateValue) => {
  if (!dateValue) {
    return "";
  }
  if (typeof dateValue === "string" && dateValue.includes("-")) {
    return reformatDate(dateValue);
  }
  return dateValue;
};

const getIndustryLabel = (code) => {
  if (!code) {
    return "";
  }
  return activityCodes[code] || "";
};

const buildStatusText = (inactive) => (inactive === "1" ? "Անգործուն" : "Ակտիվ");
const buildBlockText = (blocked) => (Number(blocked) === 1 ? "Կա" : "Չկա");

const CompanyHeaderReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const {
    taxid,
    zcode,
    name_am,
    name_en,
    name_ru,
    address = {},
    reg_num,
    capital,
    inactive,
    cert_num,
    registered,
    is_blocked,
    company_type,
    industry_code,
    soc_num,
  } = data || {};

  const { addr_descr, mobile, phone, website, email } = address || {};
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || "").trim() || "---";
  const displayName = [name_am, company_type].filter(Boolean).join(" ");
  const registeredDate = formatRegisteredDate(registered);
  const industryTitle = getIndustryLabel(industry_code);
  const primaryPhone = mobile || phone;
  const secondaryPhone =
    mobile && phone && mobile !== phone ? phone : null;

  const generalRows = [
    { label: "Անվանում (հայերեն)", value: displayName || name_am },
    { label: "Անվանում (անգլերեն)", value: name_en },
    { label: "Անվանում (ռուսերեն)", value: name_ru },
    { label: "Ընկերության տեսակ", value: company_type },
    { label: "Գրանցման ա/թ", value: registeredDate },
    { label: "Կարգավիճակ", value: buildStatusText(inactive) },
    { label: "Արգելանք", value: buildBlockText(is_blocked) },
    { label: "Ոլորտ", value: industryTitle },
    { label: "Գործունեության կոդ", value: industry_code },
  ];

  const identifiersRows = [
    { label: "ՀՎՀՀ", value: taxid },
    { label: "Գրանցման համար", value: reg_num },
    { label: "Վկայական", value: cert_num },
    { label: "Սոցիալական համար", value: soc_num },
    { label: "Զկոդ", value: zcode },
    { label: "Կապիտալ", value: formatCapital(capital) },
  ];

  const contactRows = [
    { label: "Հասցե", value: addr_descr },
    { label: "Էլ. հասցե", value: email },
    { label: "Հեռախոս", value: primaryPhone },
    secondaryPhone
      ? { label: "Լրացուցիչ հեռախոս", value: secondaryPhone }
      : null,
    { label: "Վեբ կայք", value: website },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Ընկերության ընդհանուր տվյալներ</Text>
          {taxid && <Text style={styles.subtitle}>ՀՎՀՀ {taxid}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          <SectionCard title="Ընդհանուր տվյալներ" rows={generalRows} />
          <SectionCard title="Գրանցման տվյալներ" rows={identifiersRows} />
          <SectionCard title="Կապի տվյալներ" rows={contactRows} />
        </View>
      </Page>
    </Document>
  );
};

export default CompanyHeaderReport;
