import { Text, View } from "@react-pdf/renderer";
import { styles } from "../templates.constants";

const BprHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        {/* <Image src={Logo} style={styles.logo} /> */}
      </View>
      <View style={styles.company}>
        <Text style={styles.companyText}>Ներքին որոնման համակարգ</Text>
      </View>
    </View>
  );
};

export default BprHeader;
