import { Page, Text, View, Font, Document, Image } from "@react-pdf/renderer";

import { TEMP_3_STYLES } from "./templates.constants";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import { formatDate, formatIsoDate } from "./templates.helpers";

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

const CitizenshipTemplate = ({ data, userFullName, pashton }) => {
  const {
    uid,
    document_number,
    pnum,
    person_birth,
    person_birth_place,
    person_fname,
    person_lname,
    person_mname,
    mul_number,
    createdAt,
    qrUrl,
  } = { ...data };

  const currentDate = formatIsoDate(new Date(createdAt));

  return (
    <Document>
      <Page size="A4" style={TEMP_3_STYLES.page} orientation="landscape">
        <View style={TEMP_3_STYLES.container}>
          <View style={TEMP_3_STYLES.title}>
            <Text style={TEMP_3_STYLES.titleText}>Ձև N3</Text>
          </View>
          <View style={TEMP_3_STYLES.header}>
            <Text style={TEMP_3_STYLES.headerText}>ՏԵՂԵԿԱՆՔ</Text>
            <Text style={TEMP_3_STYLES.headerText}>
              ԱՆՁԻ ՔԱՂԱՔԱՑԻՈՒԹՅԱՆ ՄԱՍԻՆ
            </Text>
          </View>
          <View style={TEMP_3_STYLES.main}>
            <View style={TEMP_3_STYLES.table}>
              {/* Table Header */}
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.smallCol]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    Տրամադրող մարմնի անվանումը
                  </Text>
                </View>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.threeCols]}>
                  <Text style={TEMP_3_STYLES.tableCell}>
                    ՀԱՅԱՍՏԱՆԻ ՀԱՆՐԱՊԵՏՈՒԹՅԱՆ ՆԵՐՔԻՆ ԳՈՐԾԵՐԻ ՆԱԽԱՐԱՐՈՒԹՅԱՆ
                    ՄԻԳՐԱՑԻԱՅԻ ԵՎ ՔԱՂԱՔԱՑԻՈՒԹՅԱՆ ԾԱՌԱՅՈՒԹՅՈՒՆ
                  </Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.smallCol]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    Տրման ամսաթիվը
                  </Text>
                </View>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.rowspan]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.topCell]}
                  >
                    {currentDate}
                  </Text>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    (օրը, ամիսը, տարեթիվը)
                  </Text>
                </View>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.rowspan]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    Տեղեկանքի համարը N
                  </Text>
                </View>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.miniCol]}>
                  <Text style={TEMP_3_STYLES.tableCell}>{document_number}</Text>
                </View>
              </View>
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.fourCols]}>
                  <Text
                    style={[
                      TEMP_3_STYLES.tableCell,
                      TEMP_3_STYLES.alignLeft,
                      TEMP_3_STYLES.boldText,
                    ]}
                  >
                    Տրվում է այն մասին, որ
                  </Text>
                </View>
              </View>
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.fourCols]}>
                  <Text style={TEMP_3_STYLES.tableCell}>
                    {person_fname} {person_lname} {person_mname || ""}
                  </Text>
                </View>
              </View>
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.fourCols]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    (անունը, ազգանունը և հայրանունը, եթե առկա է)
                  </Text>
                </View>
              </View>
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.smallCol]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    Ծննդյան ամսաթիվը
                  </Text>
                </View>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.rowspan]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.topCell]}
                  >
                    {person_birth || ""}
                  </Text>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    (օրը, ամիսը, տարեթիվը)
                  </Text>
                </View>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.rowspan]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.boldText]}
                  >
                    Ծննդյան վայրը
                  </Text>
                </View>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.miniCol]}>
                  <Text
                    style={[TEMP_3_STYLES.tableCell, TEMP_3_STYLES.textWrap]}
                  >
                    {person_birth_place || ""}
                  </Text>
                </View>
              </View>
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.fourCols]}>
                  <Text style={TEMP_3_STYLES.tableCell}>---</Text>
                </View>
              </View>
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.fourCols]}>
                  <Text
                    style={[
                      TEMP_3_STYLES.tableCell,
                      TEMP_3_STYLES.alignLeft,
                      TEMP_3_STYLES.boldText,
                    ]}
                  >
                    Տեղեկանքն ուժի մեջ է տրման օրվանից վեց ամիս:
                  </Text>
                </View>
              </View>
              <View style={TEMP_3_STYLES.tableRow}>
                <View style={[TEMP_3_STYLES.tableCol, TEMP_3_STYLES.fourCols]}>
                  <Text
                    style={[
                      TEMP_3_STYLES.tableCell,
                      TEMP_3_STYLES.alignLeft,
                      TEMP_3_STYLES.boldText,
                    ]}
                  >
                    Տրվում է ներկայացնելու ըստ պահանջի:
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={TEMP_3_STYLES.footer}>
            <View style={TEMP_3_STYLES.userCredentials}>
              <View style={TEMP_3_STYLES.personalInfo}>
                <View style={TEMP_3_STYLES.personalInfoRowContainer}>
                  <Text>{userFullName}</Text>
                  <View style={TEMP_3_STYLES.hr} />
                  <View style={TEMP_3_STYLES.signatureInfoRow}>
                    <Text style={[TEMP_3_STYLES.boldText]}>
                      (անունը, ազգանունը)
                    </Text>
                  </View>
                </View>
                <View style={TEMP_3_STYLES.personalInfoRowContainer}>
                  <Text>{pashton || ""}</Text>
                  <View style={TEMP_3_STYLES.hr} />
                  <View style={TEMP_3_STYLES.signatureInfoRow}>
                    <Text style={[TEMP_3_STYLES.boldText]}>(պաշտոնը)</Text>
                  </View>
                </View>
              </View>
              <View style={TEMP_3_STYLES.signature}>
                <View style={TEMP_3_STYLES.personalInfoRowContainer}>
                  <View style={TEMP_3_STYLES.hr} />
                  <View style={TEMP_3_STYLES.signatureInfoRow}>
                    <Text style={[TEMP_3_STYLES.boldText]}>
                      (ստորագրությունը)
                    </Text>
                  </View>
                  <Text style={[{ marginTop: 20 }, TEMP_3_STYLES.boldText]}>
                    Կ.Տ.
                  </Text>
                </View>
              </View>
            </View>
            <View style={TEMP_3_STYLES.qrRow}>
              <View style={TEMP_3_STYLES.qrContainer}>
                <Image style={TEMP_3_STYLES.qrImage} src={qrUrl} />
                <Text style={TEMP_3_STYLES.qrUid}>{uid}</Text>
              </View>
              <View style={TEMP_3_STYLES.qrInfo}>
                <Text>
                  Սույն տեղեկանքը տրվել է էլեկտրոնային եղանակով Հայաստանի
                  Հանրապետության ներքին գործերի նախարարության Միգրացիայի եւ
                  քաղաքացիության ծառայության կողմից: Սույն տեղեկանքի իսկությունը
                  հնարավոր է ստուգել սքանավորելով QR կոդը:
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CitizenshipTemplate;
