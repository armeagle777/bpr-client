import { Page, Text, View, Font, Document } from "@react-pdf/renderer";

import { QkagDocNameMaps, qkagStyles as styles } from "./templates.constants";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import { checkSamePerson, formatDate } from "./templates.helpers";
import BprHeader from "./components/BprHeader";
import QkagAside from "./components/QkagAside";
import QkagPersonRow from "./components/QkagPersonRow";

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

const Qkag = ({ data, userFullName }) => {
  const {
    type,
    office_name,
    cert_num,
    cert_num2,
    cert_date,
    full_ref_num,
    person,
    person2,
    child,
    children,
    presenter,
    med,
  } = { ...data };
  const currentDate = formatDate(new Date());
  const areSamePerson = checkSamePerson({ presenter, person, person2 });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <BprHeader />
        <View style={styles.title}>
          <Text>Փաստաթղթի որոնման արդյունքներն ըստ ՔԿԱԳ-ի</Text>
        </View>
        <View style={styles.container}>
          <QkagAside
            type={type}
            office_name={office_name}
            cert_num={cert_num}
            cert_num2={cert_num2}
            cert_date={cert_date}
            full_ref_num={full_ref_num}
            med={med}
          />
          <View style={styles.main}>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Անձնական տվյալներ</Text>
              {child && (
                <QkagPersonRow
                  {...child}
                  title={QkagDocNameMaps[type]["child"] || "Քաղաքացի"}
                />
              )}
              {person && (
                <QkagPersonRow
                  {...person}
                  title={QkagDocNameMaps[type]["person"] || "հայրը"}
                />
              )}
              {person2 && (
                <QkagPersonRow
                  {...person2}
                  title={QkagDocNameMaps[type]["person2"] || "մայրը"}
                />
              )}
              {presenter && !areSamePerson && (
                <QkagPersonRow
                  {...presenter}
                  title={QkagDocNameMaps[type]["presenter"] || ""}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>
            Տեղեկանքը գեներացվել է ՄՔԾ ներքին որոնման համակարգում {userFullName}{" "}
            օգտատիրոջ կողմից {currentDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Qkag;
