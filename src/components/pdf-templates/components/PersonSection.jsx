import { Text, View } from "@react-pdf/renderer";
import { qkagDocStyles } from "../templates.constants";
import QkagDocRow from "./QkagDocRow";
import { eduLevelsMap, maritalStatusesMap } from "../../../utils/constants";

const PersonSection = ({
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
    <View style={qkagDocStyles.section}>
      <Text style={qkagDocStyles.sectionHeader}>{title}</Text>
      <View style={qkagDocStyles.personContent}>
        <QkagDocRow label={"անունը"} text={base_info?.name || ""} />
        <QkagDocRow label={"հայրանունը"} text={base_info?.fathers_name || ""} />
        <QkagDocRow label={"ազգանունը"} text={base_info?.last_name || ""} />
        {hasNewLastName(new_last_name, base_info?.last_name) && (
          <QkagDocRow label={"նոր ազգանունը"} text={new_last_name} />
        )}
        {base_info?.nationality && (
          <QkagDocRow
            label={"ազգությունը"}
            text={
              base_info?.nationality === "40" ? "Հայ" : base_info?.nationality
            }
          />
        )}
        <QkagDocRow label={"ծննդյան ա/թ"} text={base_info?.birth_date || ""} />
        <QkagDocRow label={"սեռ"} text={gender == "1" ? "Ա" : "Ի"} />
        <QkagDocRow label={"հծհ"} text={psn || ""} />
        {marital_status && (
          <QkagDocRow
            label={"ամուսնական կարգավիճակ"}
            text={maritalStatusesMap[marital_status]}
          />
        )}
        {marriage_number && (
          <QkagDocRow label={"ամուսնությունների քնկ."} text={marriage_number} />
        )}
        {education_level && (
          <QkagDocRow
            label={"կրթություն"}
            text={eduLevelsMap[education_level]}
          />
        )}
        {employment_status && (
          <QkagDocRow label={"զբաղվածություն"} text={employment_status} />
        )}
      </View>
    </View>
  );
};

export default PersonSection;
