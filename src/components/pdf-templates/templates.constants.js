import { StyleSheet } from "@react-pdf/renderer";

const COLORS = {
  PRIMARY: "rgba(50, 65, 87, 1)",
};

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f7ff",
    fontFamily: "Arial",
    fontSize: 12,
    color: "#6A6A6A",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: "10px",
    padding: "20px 10px",
  },
  header: {
    padding: 10,
    borderBottom: `1px solid ${COLORS.PRIMARY}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoContainer: {
    width: 40,
    height: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  company: {
    width: "80%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(0,0,0,.3)",
    marginLeft: 30,
  },
  companyText: { textTransform: "uppercase" },
  aside: {
    width: "35%",
    color: "black",
  },
  asideSection: {
    backgroundColor: COLORS.PRIMARY,
    padding: "10px 5px",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    boxShadow:
      "0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)",
  },
  imageContainer: {
    width: 60,
    height: 80,
  },
  profileContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 5,
  },
  asideImage: {
    width: "100%",
    height: "100%",
  },
  asideRow: {
    padding: "5px",
    width: "100%",
    backgroundColor: "#fff",
  },
  asideRowTitle: {
    fontFamily: "Arial",
    fontSize: 8,
    marginBottom: 6,
  },
  asideRowBody: {
    fontSize: 10,
  },
  main: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  mainSection: {
    backgroundColor: COLORS.PRIMARY,
    padding: "10px 5px",
    display: "flex",
    justifyContent: "center",
    gap: 6,
    alignItems: "center",
    boxShadow:
      "0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)",
  },
  mainSectionTitle: {
    width: "100%",
    fontFamily: "Arial",
    fontSize: 8,
    fontWeight: "bold",
    paddingBottom: 4,
    color: "#e4ae4e",
    borderBottom: "0.5px solid #e4ae4e",
  },
  documentsRow: {
    width: "100%",
    padding: 10,
    // backgroundColor: "#dadada21",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
  },
  documentsRowIcon: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRight: "0.5px solid #6A6A6A",
    justifyContent: "center",
  },
  documentIconText: {
    fontSize: 8,
  },
  documentsRowBody: {
    width: "85%",
    paddingLeft: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  documentsBodyTitle: {
    fontSize: 10,
  },
  documentsLabel: {
    textAlign: "center",
    fontSize: 8,
    color: COLORS.PRIMARY,
  },
  aahLabel: {
    fontSize: 8,
    marginLeft: 20,
    color: COLORS.PRIMARY,
  },
  documentsBodyText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  documentColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addressesRow: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  addressesRowIcon: {
    height: "30px",
    width: "20%",
  },
  addressesRowBody: {
    width: "80%",
  },
  addressTitle: {
    fontFamily: "Arial",
    fontSize: 10,
    fontWeight: "bold",
  },
  addressBody: {
    fontFamily: "Arial",
    fontSize: 8,
  },
  title: {
    textAlign: "center",
    paddingTop: "10px",
    fontFamily: "Arial",
    textTransform: "uppercase",
  },
  footer: {
    borderTop: "1px dashed black",
    padding: "8px 10px",
    fontSize: 10,
    textAlign: "justify",
    color: "black",
  },
});

export const qkagStyles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f7ff",
    fontFamily: "Arial",
    fontSize: 12,
    color: "#6A6A6A",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: "10px",
    padding: "20px 10px",
  },
  header: {
    padding: 10,
    borderBottom: `1px solid ${COLORS.PRIMARY}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoContainer: {
    width: 40,
    height: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  company: {
    width: "80%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(0,0,0,.3)",
    marginLeft: 30,
  },
  companyText: { textTransform: "uppercase" },
  aside: {
    width: "35%",
    color: "black",
  },
  asideSection: {
    backgroundColor: COLORS.PRIMARY,
    padding: "10px 5px",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    boxShadow:
      "0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)",
  },
  imageContainer: {
    width: 60,
    height: 80,
  },
  profileContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 5,
  },
  asideImage: {
    width: "100%",
    height: "100%",
  },
  asideRow: {
    padding: "5px",
    width: "100%",
    backgroundColor: "#fff",
  },
  asideRowTitle: {
    fontFamily: "Arial",
    fontSize: 8,
    marginBottom: 6,
  },
  asideRowBody: {
    fontSize: 10,
  },
  main: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  mainSection: {
    backgroundColor: COLORS.PRIMARY,
    padding: "10px 5px",
    display: "flex",
    justifyContent: "center",
    gap: 6,
    alignItems: "center",
    boxShadow:
      "0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)",
  },
  mainSectionTitle: {
    width: "100%",
    fontFamily: "Arial",
    fontSize: 8,
    fontWeight: "bold",
    paddingBottom: 4,
    color: "#e4ae4e",
    borderBottom: "0.5px solid #e4ae4e",
  },
  documentsRow: {
    width: "100%",
    padding: 10,
    // backgroundColor: "#dadada21",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
  },
  documentsRowIcon: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRight: "0.5px solid #6A6A6A",
    justifyContent: "center",
  },
  documentIconText: {
    fontSize: 8,
  },
  documentsRowBody: {
    width: "85%",
    paddingLeft: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  documentsBodyTitle: {
    fontSize: 10,
  },
  documentsLabel: {
    textAlign: "center",
    fontSize: 8,
    color: COLORS.PRIMARY,
  },
  aahLabel: {
    fontSize: 8,
    marginLeft: 20,
    color: COLORS.PRIMARY,
  },
  documentsBodyText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  documentColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addressesRow: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  addressesRowIcon: {
    height: "30px",
    width: "20%",
  },
  addressesRowBody: {
    width: "80%",
  },
  addressTitle: {
    fontFamily: "Arial",
    fontSize: 10,
    fontWeight: "bold",
  },
  addressBody: {
    fontFamily: "Arial",
    fontSize: 8,
  },
  title: {
    textAlign: "center",
    paddingTop: "10px",
    fontFamily: "Arial",
    textTransform: "uppercase",
  },
  footer: {
    borderTop: "1px dashed black",
    padding: "8px 10px",
    fontSize: 10,
    textAlign: "justify",
    color: "black",
  },
});

export const qkagDocStyles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial",
    fontSize: 12,
    color: "#6A6A6A",
  },
  container: {
    flexGrow: 1,
    padding: "40px 50px 0 50px",
  },
  section: {
    marginBottom: 5,
  },
  personContent: {
    paddingLeft: 30,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  titleContainer: {
    textAlign: "center",
    borderBottom: "1px dashed black",
    paddingBottom: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 12,
    textAlign: "left",
    fontWeight: "bold",
  },
  labelContainer: {
    width: "40%",
  },
  textContainer: {
    width: "60%",
  },
  label: {},
  text: {},
  footer: {
    width: "100%",
    paddingBottom: 50,
    paddingRight: 50,
    display: "flex",
    alignItems: "flex-end",
  },
});

export const QkagDocNameMaps = {
  marriage: {
    name: "Ամուսնության Վկայական",
    person: "Ամուսին",
    person2: "Կին",
    presenter: "Ներկայացուցիչ",
  },
  birth: {
    name: "Ծննդյան Վկայական",
    child: "Երեխա",
    person: "Հայր",
    person2: "Մայր",
    presenter: "Ներկայացուցիչ",
  },
  divorce: {
    name: "Ամուսնալուծության Վկայական",
    person: "Ամուսին",
    person2: "Կին",
    child: "Երեխա",
    presenter: "Ներկայացուցիչ",
  },
  death: {
    name: "Մահվան Վկայական",
    person: "Քաղաքացի",
    presenter: "Ներկայացուցիչ",
  },
  adoption: {
    name: "Որդեգրման Վկայական",
    child: "Երեխա",
    person: "Հայր",
    person2: "Մայր",
    presenter: "Ներկայացուցիչ",
  },
  paternity: {
    name: "Հայրության ճանաչման Վկայական",
    child: "Երեխա",
    person: "Հայր",
    person2: "Մայր",
    presenter: "Ներկայացուցիչ",
  },
  chname: {
    name: "Անվանափոխության Վկայական",
    person: "Քաղաքացի",
    presenter: "Ներկայացուցիչ",
  },
};

export const TEMP_3_STYLES = {
  page: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
    fontSize: 12,
    color: "#000",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    gap: "10px",
    padding: "0 20px",
  },
  title: {
    display: "flex",
    alignItems: "flex-end",
  },
  titleText: {
    textDecoration: "underline",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    // margin: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  threeCols: { width: "80%" },
  fourCols: { width: "100%" },
  smallCol: { width: "20%" },
  miniCol: { width: "20%" },
  rowspan: {
    height: 50,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: "center",
  },
  topCell: {
    width: "100%",
    height: 25,
    margin: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  alignLeft: {
    textAlign: "left",
  },
  textCenter: {
    width: "100%",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  textWrap: { textWrap: "wrap" },
  footer: {},
  userCredentials: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0 40px",
  },
  personalInfoRowContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  personalInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    minWidth: "200px",
  },
  signature: {
    minWidth: "200px",
    paddingTop: 30,
  },
  hr: {
    width: "100%",
    borderBottom: "1px solid #000",
  },
  signatureInfoRow: { display: "flex", alignItems: "center" },
  qrRow: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  qrContainer: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  qrImage: { width: "3cm", height: "3cm" },
  qrUid: {},
  qrInfo: {
    textWrap: "wrap",
    width: "80%",
    textAlign: "justify",
  },
};
