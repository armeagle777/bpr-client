import { Text, View } from "@react-pdf/renderer";
import { bprDocumentTypes } from "../../../utils/constants";
import { styles } from "../templates.constants";
import { reformatDate } from "../templates.helpers";
const JpkDocumentRow = ({ certificate }) => {
  //   {

  //     "id": 14249,
  //     "document_number": "AP0279445",

  //     "expire_date": "2024-12-31",
  //     "printed_at": "2023-12-12",
  //     "handed_at": "2023-12-15"
  // }
  return (
    <View style={styles.documentsRow} key={certificate.id}>
      <View style={styles.documentsRowIcon}>
        <Text style={styles.documentIconText}>
          {certificate.actual === 1 ? "Վավեր" : "Անվավեր"}
        </Text>
        <Text style={styles.documentIconText}>ԺՊԿ</Text>
      </View>
      <View style={styles.documentsRowBody}>
        <View style={styles.row}>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Փաստաթղթի N</Text>
            <Text style={styles.documentsBodyText}>
              {certificate.serial_number || ""}
            </Text>
          </View>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Տրվել է</Text>
            <Text style={styles.documentsBodyText}>
              {reformatDate(certificate.issue_date)}
            </Text>
          </View>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Կողմից</Text>
            <Text style={styles.documentsBodyText}>
              {certificate.issue_by_office}
            </Text>
          </View>
          <View style={styles.documentColumn}>
            <Text style={styles.documentsLabel}>Վավեր է</Text>
            <Text style={styles.documentsBodyText}>
              {reformatDate(certificate.expire_date)}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.aahLabel}>ԱԱՀ ըստ փաստաթղթի</Text>
          <Text style={styles.documentsBodyTitle}>
            {certificate.l_name_arm || ""} {certificate.f_name_arm || ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JpkDocumentRow;
