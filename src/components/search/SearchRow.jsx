import InfoIcon from "@mui/icons-material/Info";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Chip, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { formatAddressString, isPersonJpk } from "../../utils/helperFunctions";
import { searchRowPersonData } from "../../utils/helperFunctions";
import PDFGenerator from "../PDFGenerator/PDFGenerator";
import BPR from "../pdf-templates/BPR";

const SearchRow = ({ personInfo }) => {
  const {
    PNum,
    addresses = [],
    documents = [],
    IsDead,
    DeathDate,
    Citizenship_StoppedDate,
  } = personInfo;
  const sanitizedPNum = PNum?.replace(/\//g, "*");
  const navigate = useNavigate();

  const addressLine = formatAddressString(addresses);
  const {
    gender,
    avatar,
    department,
    docNum,
    issueDate,
    validDate,
    firstName,
    lastName,
    middleName,
    birthDate,
  } = searchRowPersonData(documents);
  const user = useAuthUser();

  const noImageSrc =
    gender === "M" ? "./src/assets/male.png" : "./src/assets/female.png";
  const infoClickHandler = () => {
    navigate(`/bpr/${sanitizedPNum}`);
  };

  const isJpk = isPersonJpk(documents);

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
      }}
    >
      <CardMedia
        sx={{ height: "130px", width: "100px", bgcolor: "#ccc" }}
        image={avatar ? `data:image/jpeg;base64,${avatar}` : noImageSrc}
        title="green iguana"
      />
      <Stack direction="column" px={2}>
        <Stack direction="column">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography gutterBottom variant="h6" component="span">
              {`${firstName} ${lastName} ${middleName}`}
            </Typography>
            {isJpk && (
              <Tooltip title="ԺՊԿ" placement="top">
                <Chip size="small" color="warning" label="ԺՊԿ" />
              </Tooltip>
            )}
            <Tooltip title="Ծննդ․ ամսաթիվ" placement="top">
              <Typography component="span">{birthDate}</Typography>
            </Tooltip>
            <Tooltip title="ՀԾՀ" placement="top">
              <Chip size="small" color="primary" label={PNum} />
            </Tooltip>
            <Tooltip title="Փաստաթղթի համար" placement="top">
              <Typography component="span">{docNum}</Typography>
            </Tooltip>
            <Tooltip title="Փ/թ մարմին" placement="top">
              <Typography component="span">{department}</Typography>
            </Tooltip>
            <Tooltip title="Փ/թ վավերականություն" placement="top">
              <Typography component="span">
                {issueDate} - {validDate}
              </Typography>
            </Tooltip>
          </Stack>
          <Typography
            gutterBottom
            component="div"
            variant="body2"
            color="text.secondary"
            sx={{ width: "100%" }}
          >
            <small>ԳՐԱՆՑՄԱՆ ՀԱՍՑԵ : </small> {addressLine}
          </Typography>
        </Stack>
        <Stack spacing={1} direction="row" sx={{ mt: 2 }}>
          <PDFGenerator
            PDFTemplate={BPR}
            fileName={`bpr_${firstName}_${lastName}.pdf`}
            buttonText="Արտահանել"
            variant="outlined"
            Icon={PictureAsPdfIcon}
            data={{
              addresses,
              documents,
              PNum,
              IsDead,
              DeathDate,
              Citizenship_StoppedDate,
            }}
            userFullName={`${user.firstName} ${user.lastName}`}
          />
          <Button
            onClick={infoClickHandler}
            size="medium"
            variant="outlined"
            endIcon={<InfoIcon />}
          >
            Մանրամասն
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SearchRow;
