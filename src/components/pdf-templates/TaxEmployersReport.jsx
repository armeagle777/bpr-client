import { Document, Font, Page, Text, View } from "@react-pdf/renderer";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import BprHeader from "./components/BprHeader";
import { taxEmployersPdfStyles } from "./templates.constants";
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

const formatCurrency = (value, currency) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  const number = Number(value);
  const formatted = Number.isNaN(number)
    ? value.toString()
    : new Intl.NumberFormat("en-US").format(number);

  return currency ? `${formatted} ${currency}` : formatted;
};

const formatPositionDate = (value) => value || "—";

const EmployerCard = ({ employer }) => {
  const styles = taxEmployersPdfStyles;
  const {
    TP_NAME,
    TIN,
    Address,
    Salary,
    Net_income,
    Contract_revenue,
    PositionInfo,
  } = employer || {};

  const chipData = [
    { label: "Աշխատավարձ", data: Salary },
    { label: "Զուտ եկամուտ", data: Net_income },
    { label: "Պայմանագրային եկամուտ", data: Contract_revenue },
  ].filter((chip) => chip.data);

  return (
    <View style={styles.employerCard}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerName}>{TP_NAME || "Չսահմանված գործատու"}</Text>
        {TIN && <Text style={styles.employerMeta}>ՀՎՀՀ: {TIN}</Text>}
      </View>
      <View style={styles.employerBody}>
        {Address && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Հասցե</Text>
            <Text style={styles.infoValue}>{Address}</Text>
          </View>
        )}

        {chipData.length > 0 && (
          <View style={styles.chipList}>
            {chipData.map((chip) => (
              <Text style={styles.chip} key={chip.label}>
                {chip.label}: {formatCurrency(chip.data?.sum, chip.data?.currency)}
              </Text>
            ))}
          </View>
        )}

        <View>
          <Text style={styles.positionsTitle}>Պաշտոններ</Text>
          {PositionInfo?.length ? (
            PositionInfo.map((pos, index) => (
              <View key={`${pos.Position}-${index}`} style={styles.positionCard}>
                <Text style={styles.positionName}>{pos.Position || "Պաշտոն"}</Text>
                <Text style={styles.positionDates}>
                  Մուտք: {formatPositionDate(pos.Position_Start_Date || pos.Civil_relations_StartDate)}
                </Text>
                <Text style={styles.positionDates}>
                  Ելք: {formatPositionDate(pos.Position_End_Date || pos.Civil_relations_EndDate)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyState}>Պաշտոնների տվյալներ չկան</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const TaxEmployersReport = ({ data = {}, userFullName }) => {
  const styles = taxEmployersPdfStyles;
  const { PNum, employers } = data || {};
  const generatedAt = formatDate(new Date());
  const exporter = (userFullName || "").trim() || "---";
  const employerList = Array.isArray(employers) ? employers : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <BprHeader />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Գործատուներ</Text>
          {PNum && <Text style={styles.headerMeta}>ՀԾՀ {PNum}</Text>}
          <Text style={styles.headerMeta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.headerMeta}>Արտահանող՝ {exporter}</Text>
        </View>

        <View style={styles.container}>
          {employerList.length ? (
            employerList.map((employer, index) => (
              <EmployerCard employer={employer} key={employer?.TIN || index} />
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

export default TaxEmployersReport;
