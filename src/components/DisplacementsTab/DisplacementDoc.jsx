import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { formatDate } from "../pdf-templates/templates.helpers";

const DisplacementDoc = ({ caseInfo, isLoading }) => {
  const navigate = useNavigate();
  const {
    registartion_date,
    db_input_date,
    body,
    officer,
    case_id,
    contact,
    case_type_name,
    address_type,
    marz,
    community,
    settlement,
    street,
    building,
    apartmant,
    actual,
    a_province,
    a_community,
    a_address,
  } = caseInfo;

  const armAddress = `${marz}  ${
    community && community !== marz ? ` ,${community}` : ""
  }  ${settlement ? ` ,${settlement}` : ""}  ${street ? ` ,${street}` : ""}  ${
    building ?? ""
  }  ${apartmant ?? ""}`;
  const artsakhAddress = `${a_province || ""}  ${
    a_community ? `, ${a_community}` : ""
  }  ${a_address ? ` , ${a_address}` : ""}`;
  const user = useAuthUser();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color="text.secondary"
          gutterBottom
        >
          {case_type_name} | {case_id && ` գործ N ${case_id} `}
          {contact && ` | կոնտակտներ ${contact} `}
        </Typography>
        {artsakhAddress && (
          <Typography variant="body2" color="text.secondary">
            <small>Տեղահանման հասցե:</small> <strong>{artsakhAddress}</strong>
          </Typography>
        )}
        {armAddress && (
          <Typography variant="body2" color="text.secondary">
            <small>Բնակության հասցե:</small> <strong>{armAddress}</strong>
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          <small>Հասցեի տեսակը</small> : <strong>{address_type}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <small>Հաշվառման ա/թ</small> : <strong>{registartion_date}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <small>Մուտքագրման ա/թ </small> : <strong>{db_input_date}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <small>Մուտքագրող օպերատոր </small> :{"  "}
          <strong>{officer}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Կարգավիճակ</small> :{" "}
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: actual == 0 ? "red" : "green",
              display: "inline-block",
            }}
          ></span>
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button
          // onClick={() => navigate(`/register/${taxid}`)}
          size="small"
        >
          Ավելին
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default DisplacementDoc;
