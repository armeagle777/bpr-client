import { Image, Text, View } from "@react-pdf/renderer";

import AsideRow from "./AsideRow";
import { styles } from "../templates.constants";

const AsideBar = ({
  PNum,
  IsDead,
  ctzText,
  imageSrc,
  DeathDate,
  personInfo,
  fullAddress,
  birthRegion,
  currentAddress,
  Citizenship_StoppedDate,
}) => {
  return (
    <View style={styles.aside}>
      <View style={styles.asideSection}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image src={imageSrc} style={styles.asideImage} />
          </View>
          <Text>
            {personInfo?.First_Name || ""} {personInfo?.Last_Name || ""}
          </Text>
          <Text>{personInfo.Patronymic_Name || ""}</Text>
        </View>

        <AsideRow label={"Ծննդ. ամսաթիվ"} text={personInfo.Birth_Date} />
        <AsideRow label={"ՀԾՀ"} text={PNum} />
        <AsideRow
          label={"Ազգություն"}
          text={personInfo.Nationality?.NationalityName || ""}
        />
        <AsideRow label={"Քաղաքացիություն"} text={ctzText} />
        <AsideRow label={"Ծննդավայր"} text={birthRegion} />
        <AsideRow label={"Հասցե"} text={currentAddress && fullAddress} />
        {Citizenship_StoppedDate && (
          <AsideRow
            label={"Քաղաքացիությունը դադարացրել է"}
            text={Citizenship_StoppedDate}
          />
        )}
        {IsDead && <AsideRow label={"Մահացել է"} text={DeathDate} />}
      </View>
    </View>
  );
};

export default AsideBar;
