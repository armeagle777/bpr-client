import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Alert } from "@mui/material";
import { userHasPermission } from "../../utils/helperFunctions";

const RequirePermission = ({ children, permissions }) => {
  const user = useAuthUser();

  const hasPermission =
    user && userHasPermission(permissions, user.permissions);

  return hasPermission ? (
    children
  ) : (
    <Alert severity="error">
      Ձեր լիազորությունները բավարար չեն տվյալ էջը դիտելու համար:
    </Alert>
  );
};

export default RequirePermission;
