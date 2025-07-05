import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useState } from "react";

import { documentNames } from "../../utils/constants";
import { formatDates } from "../../utils/helperFunctions";
import PersonRow from "./PersonRow";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import PDFGenerator from "../PDFGenerator/PDFGenerator";
import MedRow from "./MedRow";
import Qkag from "../pdf-templates/Qkag";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const QkagDocument = ({ document, targetSsn }) => {
  const [open, setOpen] = useState(false);
  const {
    type,
    office_name,
    cert_num,
    cert_num2,
    cert_date,
    full_ref_num,
    person,
    person2,
    child,
    children,
    presenter,
    med,
  } = document;
  const areSamePerson = ({ presenter, person, person2 }) => {
    return (
      (presenter?.base_info?.name === person?.base_info?.name &&
        presenter?.base_info?.last_name === person?.base_info?.last_name) ||
      (presenter?.base_info?.name === person2?.base_info?.name &&
        presenter?.base_info?.last_name === person2?.base_info?.last_name)
    );
  };

  const user = useAuthUser();

  const handleClick = () => {
    setOpen(!open);
  };

  const qkagDocumentName =
    type === "birth"
      ? `${child.base_info.name}_${child.base_info.last_name}_birth`
      : `${person?.base_info?.name}_${person?.base_info?.last_name}_${type}`;

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby={type}
      subheader={
        <ListSubheader component="div" id={type}>
          {documentNames[type]["name"]}
        </ListSubheader>
      }
    >
      <ListItem onClick={handleClick} style={{ cursor: "pointer" }}>
        <ListItemIcon>{documentNames[type]["icon"]}</ListItemIcon>
        <ListItemText
          primary={`${cert_num}${
            cert_num2 ? `-${cert_num2}` : ""
          } | ${formatDates(cert_date)} | ${office_name} | ${
            full_ref_num || ""
          }`}
        />
        <PDFGenerator
          PDFTemplate={Qkag}
          fileName={`${qkagDocumentName}.pdf`}
          buttonText=""
          variant="text"
          Icon={PictureAsPdfIcon}
          data={document}
          userFullName={`${user.firstName} ${user.lastName}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <PersonRow person={person} targetSsn={targetSsn} />
          {person2 && <PersonRow person={person2} targetSsn={targetSsn} />}
          {child && (
            <PersonRow role="baby" person={child} targetSsn={targetSsn} />
          )}
          {med?.document_number && <MedRow med={med} />}
          {presenter?.base_info &&
            !areSamePerson({ presenter, person, person2 }) && (
              <PersonRow
                isPresenter={true}
                person={presenter}
                targetSsn={presenter.psn}
              />
            )}
        </List>
      </Collapse>
    </List>
  );
};

export default QkagDocument;
