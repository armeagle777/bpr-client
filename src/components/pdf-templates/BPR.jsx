import { Page, Text, View, Document } from "@react-pdf/renderer";

import { styles } from "./templates.constants";
import BprAddressRow from "./components/BprAddressRow";
import BprDocumentRow from "./components/BprDocumentRow";

import { formatBprData, formatDate } from "./templates.helpers";
import AsideBar from "./components/AsideBar";
import BprHeader from "./components/BprHeader";
import registerPdfFonts from "./registerFonts";

registerPdfFonts();

const BPR = ({ data, userFullName }) => {
  const {
    IsDead,
    DeathDate,
    PNum = "",
    documents,
    addresses = [],
    Citizenship_StoppedDate,
  } = { ...data };

  const {
    ctzText,
    imageSrc,
    personInfo,
    fullAddress,
    birthRegion,
    currentAddress,
    validDocuments,
    invalidDocuments,
  } = formatBprData({ addresses, documents });

  const currentDate = formatDate(new Date());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <BprHeader />
        <View style={styles.title}>
          <Text>Անձի որոնման արդյունքներն ըստ ԲՊՌ-ի</Text>
        </View>
        <View style={styles.container}>
          <AsideBar
            PNum={PNum}
            IsDead={IsDead}
            ctzText={ctzText}
            imageSrc={imageSrc}
            DeathDate={DeathDate}
            personInfo={personInfo}
            birthRegion={birthRegion}
            fullAddress={fullAddress}
            currentAddress={currentAddress}
            Citizenship_StoppedDate={Citizenship_StoppedDate}
          />
          <View style={styles.main}>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Փաստաթղթեր</Text>
              {validDocuments?.length > 0 &&
                validDocuments.map((doc) => (
                  <BprDocumentRow key={doc.Document_Number} doc={doc} />
                ))}
              {invalidDocuments?.length > 0 &&
                invalidDocuments.map((doc) => (
                  <BprDocumentRow key={doc.Document_Number} doc={doc} />
                ))}
            </View>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Գրանցման հասցեներ</Text>
              {addresses?.length > 0 &&
                addresses.map((addr, index) => {
                  const { RegistrationAddress, RegistrationData } = addr;
                  return (
                    <BprAddressRow
                      key={index}
                      RegistrationAddress={RegistrationAddress}
                      RegistrationData={RegistrationData}
                    />
                  );
                })}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BPR;
