import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import CardRow from "./CardRow";
import { Stack } from "@mui/material";

const EatmClaimCard = ({ claim }) => {
  const navigate = useNavigate();
  const {
    user_id,
    ssn,
    first_name_am,
    last_name_am,
    patronymic_am,
    first_name_en,
    last_name_en,
    patronymic_en,
    eaeu_employee_id,
    claim_id,
    created_at,
    status,
    claim_type,
    filled_in_address,
    agreement_start_date,
    agreement_end_date,
    passport_number,
    passport_issued,
    passport_valid,
    decision_date,
    action,
    user_email,
    user_tel,
  } = claim;

  const user = useAuthUser();

  return (
    <Card sx={{ minWidth: 275 }}>
      <Typography
        sx={{ fontSize: 14, fontWeight: "bold" }}
        color="text.secondary"
        gutterBottom
      >
        Դիմում N {claim_id}, դիմումի ընթացակարգ՝ ԵԱՏՄ
      </Typography>
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Stack sx={{ width: "150px" }}></Stack>
        <Stack sx={{ flex: 1 }}>
          <CardRow label="ԱՆուն" text={`${first_name_am} | ${first_name_en}`} />
          <CardRow
            label="Ազգանուն"
            text={`${last_name_am} | ${last_name_en}`}
          />
          <CardRow
            label="Հայրանուն"
            text={`${patronymic_am} | ${patronymic_en}`}
          />
          <CardRow
            label="Անձնագիր"
            text={`${passport_number} | ${passport_issued} | ${passport_valid}`}
          />
          <CardRow label="Հասցե" text={filled_in_address} />
          <CardRow label="Հեռ։" text={user_tel} />
          <CardRow label="Էլ փոստ։" text={user_email} />
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <CardRow label="Դիմումի տեսակ" text={claim_type} />
          <CardRow label="Դիմումի ա/թ" text={created_at} />
          <CardRow label="Որոշման տեսակ" text={action} />
          <CardRow label="Որոշման ա/թ" text={decision_date} />
          <CardRow label="Պայմանագրի սկիզբ" text={agreement_start_date} />
          <CardRow label="Պայմանագրի ավարտ" text={agreement_end_date} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EatmClaimCard;
