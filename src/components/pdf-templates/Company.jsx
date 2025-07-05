import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";

Font.register({
  family: "Arial",
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

const styles = StyleSheet.create({
  page: {
    fontFamily: "Arial",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 10,
  },
});

const Company = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <Text>Company DATA</Text>
        <Text style={styles.text}>{data.name_am}</Text>
      </View>
    </Page>
  </Document>
);

export default Company;
