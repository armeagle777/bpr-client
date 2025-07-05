import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import CardRow from "./CardRow";
import { Stack } from "@mui/material";
import { userHasPermission } from "../../../utils/helperFunctions";
import { permissionsMap } from "../../../utils/constants";

const WpClaimCard = ({ claim }) => {
  const navigate = useNavigate();
  const {
    ssn,
    employee_id,
    claim_id,
    created_at,
    status,
    claim_type,
    decision_date,
    action,
    vacancy_type,
    company_id,
    tin,
    name,
    company_email,
    company_tel,
    position_code_id,
    name_am,
    user_email,
    user_tel,
    photo_path,
  } = claim;

  const user = useAuthUser();
  const link =
    userHasPermission(
      [permissionsMap.PETREGISTER.uid, permissionsMap.ADMIN.uid],
      user.permissions
    ) && tin
      ? `/register/${tin}`
      : null;

  return (
    <Card sx={{ minWidth: 275 }}>
      <Typography
        sx={{ fontSize: 14, fontWeight: "bold" }}
        color="text.secondary"
        gutterBottom
      >
        Դիմում N {claim_id}, դիմումի ընթացակարգ՝ Աշխատանքի թույլտվություն
      </Typography>
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Stack sx={{ width: "150px" }}></Stack>
        <Stack sx={{ flex: 1 }}>
          <CardRow label="Մասնագիտություն" text={name_am} />
          <CardRow label="Հաստիքի ծածկագիր" text={position_code_id} />
          <CardRow label="Հեռ։" text={user_tel} />
          <CardRow label="Էլ փոստ։" text={user_email} />
          <CardRow label="Կազմակերպություն" text={name} />
          <CardRow label="ՀՎՀՀ" text={tin} link={link} />
          <CardRow label="Էլ փոստ։" text={company_email} />
          <CardRow label="Հեռ։" text={company_tel} />
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <CardRow label="Դիմումի տեսակ" text={claim_type} />
          <CardRow label="Դիմումի ա/թ" text={created_at} />
          <CardRow label="Որոշման տեսակ" text={action} />
          <CardRow label="Որոշման ա/թ" text={decision_date} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WpClaimCard;
