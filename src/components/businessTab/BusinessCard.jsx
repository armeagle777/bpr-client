import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { activityCodes } from "../../utils/industryCodes";
import { useNavigate } from "react-router-dom";

const BusinessCard = ({ company }) => {
  const {
    name_am,
    name_en,
    name_ru,
    company_type,
    cert_num,
    taxid,
    address: companyAddress,
    industry_code,
    executive,
    sole_proprietor,
  } = {
    ...company,
  };

  const director = executive
    ? { ...executive }
    : sole_proprietor
    ? { ...sole_proprietor }
    : {};

  const { address, full_name, identification_no } = director;
  const { addr_descr, phone } = { ...address };

  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name_am} {name_en && ` | ${name_en}`} {name_ru && ` | ${name_ru}`}{" "}
          {company_type} ( {cert_num} )
        </Typography>
        <Typography variant="span" component="div">
          <small>Տնօրեն:</small> {full_name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <HomeIcon color="primary" /> : {addr_descr}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PhoneIphoneIcon color="primary" /> : {phone && `0${phone}`}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ContactMailIcon color="primary" /> : {identification_no}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          <small>ՀՎՀՀ։</small> {taxid}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <small>Ոլորտը։</small> {activityCodes[industry_code] || industry_code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <small>Հասցե։</small> {companyAddress?.addr_descr}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/register/${taxid}`)} size="small">
          Ավելին
        </Button>
      </CardActions>
    </Card>
  );
};

export default BusinessCard;
