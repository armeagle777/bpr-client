import { Text, View } from "@react-pdf/renderer";
import { qkagDocStyles } from "../templates.constants";

const QkagMedRow = ({ label, text }) => {
  return (
    <View style={qkagDocStyles.row}>
      <View style={qkagDocStyles.labelContainer}>
        <Text style={qkagDocStyles.label}>{label}</Text>
      </View>
      <View style={qkagDocStyles.textContainer}>
        <Text style={qkagDocStyles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default QkagMedRow;
