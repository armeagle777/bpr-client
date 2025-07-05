import { Text, View } from "@react-pdf/renderer";

import { styles } from "../templates.constants";

const AsideRow = ({ label, text }) => {
  return (
    <View style={styles.asideRow}>
      <Text style={styles.asideRowTitle}>{label}</Text>
      <Text style={styles.asideRowBody}>{text}</Text>
    </View>
  );
};

export default AsideRow;
