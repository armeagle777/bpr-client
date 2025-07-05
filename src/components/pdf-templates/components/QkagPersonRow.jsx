import { Text, View } from "@react-pdf/renderer";

import { qkagStyles as styles } from "../templates.constants";
import { eduLevelsMap, maritalStatusesMap } from "../../../utils/constants";

const QkagPersonRow = ({
  title,
  psn,
  id_type,
  id_number,
  citizenship,
  id_department,
  id_issue_date,
  id_expirey_date,
  base_info,
  new_last_name,
  gender,
  birth,
  resident,
  education_level,
  employment_status,
  marital_status,
  marriage_number,
}) => {
  const hasNewLastName = (oldLastName, newLastName) =>
    oldLastName && newLastName && oldLastName !== newLastName;
  return (
    <View style={styles.documentsRow}>
      <View style={styles.documentsRowIcon}>
        <Text style={styles.documentIconText}>{title}</Text>
      </View>
      <View style={styles.documentsRowBody}>
        <View style={styles.row}>
          {base_info?.name && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Անուն</Text>
              <Text style={styles.documentsBodyText}>
                {base_info?.name || ""}{" "}
              </Text>
            </View>
          )}
          {base_info?.fathers_name && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Հայրանուն</Text>
              <Text style={styles.documentsBodyText}>
                {base_info?.fathers_name || ""}
              </Text>
            </View>
          )}
          {base_info?.last_name && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Ազգանուն</Text>
              <Text style={styles.documentsBodyText}>
                {base_info?.last_name || ""}
              </Text>
            </View>
          )}
          {hasNewLastName(new_last_name, base_info?.last_name) && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Նոր ազգանուն</Text>
              <Text style={styles.documentsBodyText}>{new_last_name}</Text>
            </View>
          )}
        </View>
        <View style={styles.row}>
          {base_info?.nationality && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Ազգություն</Text>
              <Text style={styles.documentsBodyText}>
                {base_info?.nationality === "40"
                  ? "Հայ"
                  : base_info?.nationality}
              </Text>
            </View>
          )}
          {base_info?.birth_date && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Ծննդյան ա/թ</Text>
              <Text style={styles.documentsBodyText}>
                {base_info?.birth_date || ""}
              </Text>
            </View>
          )}
          {gender && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Սեռ</Text>
              <Text style={styles.documentsBodyText}>
                {gender == "1" ? "Ա" : "Ի"}
              </Text>
            </View>
          )}
          {psn && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>ՀԾՀ</Text>
              <Text style={styles.documentsBodyText}>{psn || ""}</Text>
            </View>
          )}
        </View>
        <View style={styles.row}>
          {marital_status && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Ամուսնական կարգավիճակ</Text>
              <Text style={styles.documentsBodyText}>
                {maritalStatusesMap[marital_status]}
              </Text>
            </View>
          )}
          {marriage_number && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Ամուսնությունների քնկ.</Text>
              <Text style={styles.documentsBodyText}>{marriage_number}</Text>
            </View>
          )}
        </View>
        <View style={styles.row}>
          {education_level && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Կրթություն</Text>
              <Text style={styles.documentsBodyText}>
                {eduLevelsMap[education_level]}
              </Text>
            </View>
          )}
          {employment_status && (
            <View style={styles.documentColumn}>
              <Text style={styles.documentsLabel}>Զբաղվածություն</Text>
              <Text style={styles.documentsBodyText}>{employment_status}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default QkagPersonRow;
