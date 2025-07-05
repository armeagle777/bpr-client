import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardRow from "./CardRow";
import { familyMembersMap } from "./constants";
import { userHasPermission } from "../../../utils/helperFunctions";
import { permissionsMap } from "../../../utils/constants";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const EatmFamilyCard = ({ claim }) => {
  const navigate = useNavigate();
  const {
    applicant_user_id,
    family_member_ssn,
    eaeu_employee_family_member_id,
    family_member_first_name_am,
    family_member_last_name_am,
    family_member_patronymic_am,
    family_member_first_name_en,
    family_member_last_name_en,
    family_member_patronymic_en,
    family_member_passport,
    family_member_passport_issued,
    family_member_passport_valid,
    family_member_email,
    family_member_tel,
    gender_id,
    family_member_id,
    family_member_bday,
    family_member_citizenship,
    family_member_citizenship_alpha_3,
    claim_id,
    claim_date,
    claim_status,
    claim_type,
    applicant_ssn,
    decision_date,
    action,
    family_member_card,
    family_member_card_issue_date,
    family_member_card_expire_date,
    applicant_first_name_am,
    applicant_last_name_am,
    applicant_first_name_en,
    applicant_last_name_em,
    photo_path,
  } = claim;

  const user = useAuthUser();

  const link =
    userHasPermission(
      [permissionsMap.BPR.uid, permissionsMap.ADMIN.uid],
      user.permissions
    ) && applicant_ssn
      ? `/bpr/${applicant_ssn}`
      : null;

  return (
    <Card sx={{ minWidth: 275 }}>
      <Typography
        sx={{ fontSize: 14, fontWeight: "bold" }}
        color="text.secondary"
        gutterBottom
      >
        Դիմում N {claim_id}, դիմումի ընթացակարգ՝ ԵԱՏՄ Ընտանիք
      </Typography>
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Stack sx={{ width: "150px" }}></Stack>
        <Stack sx={{ flex: 1 }}>
          <CardRow
            label="ԱՆուն"
            text={`${family_member_first_name_am} | ${family_member_first_name_en}`}
          />
          <CardRow
            label="Ազգանուն"
            text={`${family_member_last_name_am} | ${family_member_last_name_en}`}
          />
          <CardRow
            label="Հայրանուն"
            text={`${family_member_patronymic_am || ""} | ${
              family_member_patronymic_en || ""
            }`}
          />
          <CardRow
            label="Անձնագիր"
            text={`${family_member_passport} | ${family_member_passport_issued} | ${family_member_passport_valid}`}
          />
          <CardRow label="Դիմումատուի ՀԾՀ" text={applicant_ssn} link={link} />
          <CardRow
            label="Դիմումատուի Անուն"
            text={`${applicant_first_name_am} | ${applicant_first_name_en}`}
          />
          <CardRow
            label="Դիմումատուի Ազգանուն"
            text={`${applicant_last_name_am} | ${applicant_last_name_em}`}
          />
          <CardRow
            label="Դիմումատուի Դերը"
            text={familyMembersMap[family_member_id]}
          />
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <CardRow label="Դիմումի տեսակ" text={claim_type} />
          <CardRow label="Դիմումի ա/թ" text={claim_date} />
          <CardRow label="Որոշման տեսակ" text={action} />
          <CardRow label="Որոշման կարգավիճակ" text={claim_status} />
          <CardRow label="Որոշման ա/թ" text={decision_date} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EatmFamilyCard;
