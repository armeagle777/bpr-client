import { Image, Text, View } from "@react-pdf/renderer";
import Logo from "../../../assets/logo.png";
import { styles } from "../templates.constants";

const BprHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image src={Logo} style={styles.logo} />
      </View>
      <View style={styles.company}>
        <Text style={styles.companyText}>
          Միգրացիայի ԵՎ Քաղաքացիության ծառայության ներքին որոնման համակարգ
        </Text>
      </View>
    </View>
  );
};

export default BprHeader;
