import { Stack } from "@mui/material";
import WpClaimCard from "./WpClaimCard";

const WpCaseList = ({ data }) => {
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.map((claim, index) => {
        const {
          action,
          applicant_first_name_am,
          applicant_first_name_en,
          applicant_last_name_am,
          applicant_last_name_em,
          applicant_user_id,
          claim_date,
          claim_id,
          claim_status,
          claim_type,
          decision_date,
          eaeu_employee_family_member_id,
          family_member_bday,
          family_member_card,
          family_member_card_expire_date,
          family_member_card_issue_date,
          family_member_citizenship,
          family_member_citizenship_alpha_3,
          family_member_email,
          family_member_first_name_am,
          family_member_first_name_en,
          family_member_id,
          family_member_last_name_am,
          family_member_last_name_en,
          family_member_passport,
          family_member_passport_issued,
          family_member_passport_valid,
          family_member_patronymic_am,
          family_member_patronymic_en,
          family_member_ssn,
          family_member_tel,
          gender_id,
          ssn,
        } = claim;
        return <WpClaimCard key={index} claim={claim} />;
      })}
    </Stack>
  );
};

export default WpCaseList;
