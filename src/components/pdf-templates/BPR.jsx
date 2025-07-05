import { Page, Text, View, Font, Document } from "@react-pdf/renderer";

import { styles } from "./templates.constants";
import BprAddressRow from "./components/BprAddressRow";
import BprDocumentRow from "./components/BprDocumentRow";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import { formatBprData, formatDate } from "./templates.helpers";
import AsideBar from "./components/AsideBar";
import BprHeader from "./components/BprHeader";
import JpkDocumentRow from "./components/JpkDocumentRow";

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

const BPR = ({ data, userFullName }) => {
  const {
    IsDead,
    DeathDate,
    PNum = "",
    documents,
    addresses = [],
    Citizenship_StoppedDate,
    certificates,
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
              {certificates?.length && (
                <>
                  <Text style={styles.mainSectionTitle}>ԺՊԿ Վկայականներ</Text>
                  {certificates.map((certificate) => (
                    <JpkDocumentRow
                      key={certificate.id}
                      certificate={certificate}
                    />
                  ))}
                </>
              )}
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

export default BPR;
