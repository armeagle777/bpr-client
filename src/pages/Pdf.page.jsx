import React from "react";
import { StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import BPR from "../components/pdf-templates/BPR";
import Qkag from "../components/pdf-templates/Qkag";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import CitizenshipTemplate from "../components/pdf-templates/CitizenshipTemplate";

const styles = StyleSheet.create({
  pdfContainer: {
    width: "100%",
    height: "100vh",
  },
});

const Pdf = () => {
  const auth = useAuthUser();

  return (
    <PDFViewer style={styles.pdfContainer}>
      <CitizenshipTemplate
        userFullName={`${auth.firstName} ${auth.lastName}`}
        data={{
          id: 22,
          uid: "MQ15-AC10-755B-3401",
          userId: 2,
          document_number: "Ք/2024-22",
          pnum: "2701850401",
          person_birth: "17/01/1985",
          person_birth_place: "ԵՐԵՎԱՆ",
          person_fname: "ՏԻԳՐԱՆ",
          person_lname: "ԵՐԱՆՅԱՆ",
          person_mname: "ԱՇՈՏԻ",
          TexekanqtypeId: 1,
          mul_number: "nnnnn",
          updatedAt: "2024-12-09T20:50:03.409Z",
          createdAt: "2024-12-09T20:50:03.409Z",
          qrUrl:
            "data:image/png;base64,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",
        }}
      />
      {/* <Qkag /> */}
    </PDFViewer>
  );
};

export default Pdf;
