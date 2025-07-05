import { View, Text } from "@react-pdf/renderer";

import { styles } from "../templates.constants";

const BprAddressRow = ({ RegistrationData, RegistrationAddress }) => {
  return (
    <View style={styles.documentsRow}>
      <View style={styles.documentsRowIcon}>
        <Text style={styles.documentIconText}>
          {RegistrationData?.Registration_Status || ""}
        </Text>
        <Text style={styles.documentIconText}>
          {RegistrationData?.Registration_Type === "OLD" ? "Հին" : "ՆԵրկա"}
        </Text>
      </View>
      <View style={styles.documentsRowBody}>
        <Text style={styles.addressTitle}>
          {RegistrationAddress?.Region || ""}
          {", "}
          {(RegistrationAddress?.Community &&
            RegistrationAddress?.Community !== RegistrationAddress?.Region &&
            RegistrationAddress?.Community) ||
            ""}{" "}
          {RegistrationAddress?.Residence || ""}{" "}
          {RegistrationAddress?.Street || ""}{" "}
          {RegistrationAddress?.Building || ""}{" "}
          {RegistrationAddress?.Building_Type || ""}{" "}
          {RegistrationAddress?.Apartment || ""}
        </Text>
        <Text style={styles.addressBody}>
          {RegistrationData?.Registration_Aim?.AimName || ""}
          {": "}
          {RegistrationData?.Registration_Date || ""}
          {" | "}
          {RegistrationData?.Registration_Department || ""}
          {RegistrationData?.Registered_Date &&
            (` - ${RegistrationData.Registered_Date} | ${
              RegistrationData?.Registered_Department || ""
            }` ||
              "")}
        </Text>
      </View>
    </View>
  );
};

export default BprAddressRow;
