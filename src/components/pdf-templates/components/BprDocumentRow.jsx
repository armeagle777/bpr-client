import { Text, View } from "@react-pdf/renderer";
import { bprDocumentTypes } from "../../../utils/constants";
import { styles } from "../templates.constants";
const BprDocumentRow = ({ doc }) => {
  return (
    <View style={styles.documentsRow} key={doc?.Document_Number}>
      <View style={styles.documentsRowIcon}>
        <Text style={styles.documentIconText}>
          {doc.Document_Status === "VALID" ||
          doc.Document_Status === "PRIMARY_VALID"
            ? "Վավեր"
            : "Անվավեր"}
        </Text>
        <Text style={styles.documentIconText}>
          {bprDocumentTypes[doc.Document_Type]}
        </Text>
      </View>
      <View style={styles.documentsRowBody}>
        <View style={styles.row}>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Փաստաթղթի N</Text>
            <Text style={styles.documentsBodyText}>
              {doc?.Document_Number || ""}
            </Text>
          </View>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Տրվել է</Text>
            <Text style={styles.documentsBodyText}>
              {doc?.PassportData?.Passport_Issuance_Date || ""}
            </Text>
          </View>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Կողմից</Text>
            <Text style={styles.documentsBodyText}>
              {doc?.Document_Department}
            </Text>
          </View>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Վավեր է</Text>
            <Text style={styles.documentsBodyText}>
              {doc?.PassportData?.Passport_Validity_Date}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.aahLabel}>ԱԱՀ ըստ փաստաթղթի</Text>
          <Text style={styles.documentsBodyTitle}>
            {doc?.Person?.Last_Name || ""} {doc?.Person?.First_Name || ""}{" "}
            {doc?.Person?.Patronymic_Name || ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BprDocumentRow;
