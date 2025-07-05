import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const KadastrDocument = ({ property, isLoading }) => {
  const navigate = useNavigate();
  const {
    UNIT_ADDRESS,
    cad_bld_area,
    cad_land_area,
    cad_is_terminate,
    cad_rgt_type_name,
    cad_registration_date,
    cad_land_trg_prp_type,
    cad_certificate_number,
    cad_prcl_rgt_type_name,
    cad_bld_trg_prp_tps_name,
    cad_land_designated_type,
    cad_bld_purpose_of_use_name,
    owned_realty_address,
  } = property;

  const {
    house,
    region,
    building,
    community,
    house_type,
    street_name,
    street_type,
    building_type,
    substreet_type,
    substreet_name,
  } = owned_realty_address;

  const user = useAuthUser();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color="text.secondary"
          gutterBottom
        >
          {UNIT_ADDRESS} |
          {cad_certificate_number && ` վկայական N ${cad_certificate_number} `}
        </Typography>
        {cad_bld_purpose_of_use_name && (
          <Typography variant="body2" color="text.secondary">
            <small>Շենք, շինությունների տեսակ:</small>{" "}
            {cad_bld_purpose_of_use_name}
          </Typography>
        )}
        {cad_land_designated_type && (
          <Typography variant="body2" color="text.secondary">
            <small>Հողամասի գործառնական նշանակություն:</small>{" "}
            <strong>{cad_land_designated_type}</strong>
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Գրանցված իրավունքի տեսակ</small> :{" "}
          <strong>{cad_prcl_rgt_type_name || cad_rgt_type_name}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Նշանակություն</small> :{" "}
          <strong>{cad_land_trg_prp_type || cad_bld_trg_prp_tps_name}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Իրավունքների գրանցման ամսաթիվը </small> :{" "}
          <strong>{cad_registration_date}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Մակերեսը </small> :{"  "}
          <strong>
            {cad_bld_area && `${cad_bld_area}մ²`}
            {cad_land_area && `${cad_land_area}հա`}
          </strong>
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
              backgroundColor: cad_is_terminate == "1" ? "red" : "green",
              display: "inline-block",
            }}
          ></span>
        </Typography>
        {/* <GoogleMap latitude={40.1792} longitude={44.4991} /> */}
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

export default KadastrDocument;
