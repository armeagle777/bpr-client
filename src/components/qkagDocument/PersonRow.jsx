import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import {
  eduLevelsMap,
  maritalStatusesMap,
  qkagDocumentTypes,
} from "../../utils/constants";
import { formatDates } from "../../utils/helperFunctions";
import useFetchPerson from "../../hooks/useFetchPerson";
import { Skeleton } from "@mui/material";

const PersonRow = ({ role, person, targetSsn, isPresenter }) => {
  const {
    psn,
    gender,
    id_type,
    id_number,
    citizenship,
    id_department,
    id_issue_date,
    id_expirey_date,
    new_last_name,
    base_info,
    resident,
    education_level,
    employment_status,
    marital_status,
    marriage_number,
  } = { ...person };
  const { country, region, community, street, house_type, house } = {
    ...resident,
  };
  const { name, last_name, fathers_name, birth_date } = { ...base_info };
  const roleImageSrc =
    role === "baby" ? "baby" : gender === "1" ? "male" : "female";
  const { data: bprData, isLoading, isError, error } = useFetchPerson(psn);
  const imageUrl = bprData?.documents?.find((doc) => doc.Photo_ID)?.Photo_ID;

  const navigate = useNavigate();

  const handleRowClick = () => {
    if (psn !== targetSsn) {
      navigate(`/bpr/${psn}`);
    }
  };

  return (
    <ListItemButton
      onClick={handleRowClick}
      sx={{ pl: 4, cursor: psn === targetSsn ? "default" : "pointer" }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt={`${name} ${last_name} ${
                new_last_name ? ` (${new_last_name})` : ""
              }`}
              src={
                imageUrl
                  ? `data:image/jpeg;base64,${imageUrl}`
                  : `../src/assets/${roleImageSrc}.png`
              }
            />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={`${
            isPresenter ? "Ներկայացուցիչ - " : ""
          }${last_name} ${name}${fathers_name ? ` ${fathers_name}` : ""}`}
          secondary={
            <>
              <Typography
                sx={{ display: "inline", fontWeight: "bold" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {id_type ? `${qkagDocumentTypes[id_type]} ։` : ""}
              </Typography>
              {id_number
                ? `${id_number} ${id_department} ${formatDates(
                    id_issue_date
                  )} ; `
                : ""}
              <Typography
                sx={{ display: "inline", fontWeight: "bold" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Հասցե։
              </Typography>
              {` ${country || ""} ${
                region === community
                  ? region || ""
                  : `${region || ""}, ${community || ""}`
              } ${street || ""} ${house_type || ""} ${house || ""}`}
              {(education_level ||
                employment_status ||
                marital_status ||
                marriage_number) && (
                <>
                  <br />
                  {education_level && (
                    <>
                      <Typography
                        sx={{ display: "inline", fontWeight: "bold" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Կրթություն:
                      </Typography>{" "}
                      {eduLevelsMap[education_level] || ""}
                      {"; "}
                    </>
                  )}
                  {employment_status && (
                    <>
                      <Typography
                        sx={{ display: "inline", fontWeight: "bold" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Աշխատանք:
                      </Typography>{" "}
                      {employment_status}
                      {"; "}
                    </>
                  )}
                  {marital_status && (
                    <>
                      <br />
                      <Typography
                        sx={{ display: "inline", fontWeight: "bold" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ամուսնական կարգավիճակ:
                      </Typography>{" "}
                      {maritalStatusesMap[marital_status] || ""}
                      {"; "}
                    </>
                  )}
                  {marriage_number && (
                    <>
                      <Typography
                        sx={{ display: "inline", fontWeight: "bold" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ամուսնությունների քանակ:
                      </Typography>{" "}
                      {marriage_number || ""}
                    </>
                  )}
                </>
              )}
            </>
          }
        />
      </ListItem>
    </ListItemButton>
  );
};

export default PersonRow;
