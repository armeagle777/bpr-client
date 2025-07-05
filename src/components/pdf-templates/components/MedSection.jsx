import { Text, View } from "@react-pdf/renderer";
import { qkagDocStyles } from "../templates.constants";
import QkagMedRow from "./QkagMedRow";

const MedSection = ({
  title,
  death = {},
  institution_name,
  document_name,
  document_number,
  document_date,
}) => {
  const { date, place, reason } = { ...death };
  return (
    <View style={qkagDocStyles.section}>
      <Text style={qkagDocStyles.sectionHeader}>{title}</Text>
      <View style={qkagDocStyles.personContent}>
        <QkagMedRow label={"ամվանում"} text={institution_name} />
        {document_name && <QkagMedRow label={"փ/թ"} text={document_name} />}
        {document_number && (
          <QkagMedRow label={"փ/թ N"} text={document_number} />
        )}
        {document_date && (
          <QkagMedRow label={"փ/թ ամսաթիվ"} text={document_date} />
        )}
        {reason && <QkagMedRow label={"մահվան պատճառ"} text={reason} />}
        {place && <QkagMedRow label={"մահվան վայր"} text={place} />}
        {date && <QkagMedRow label={"մահվան ա/թ"} text={date} />}
      </View>
    </View>
  );
};

export default MedSection;
