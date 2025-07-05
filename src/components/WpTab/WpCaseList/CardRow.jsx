import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CardRow = ({ label, text, link }) => {
  const InfoCell = () =>
    link ? (
      <Link to={link}>
        <strong>{text}</strong>
      </Link>
    ) : (
      <strong>{text}</strong>
    );
  return (
    <Typography variant="body2" color="text.secondary">
      <small>{label}</small> : <InfoCell />
    </Typography>
  );
};

export default CardRow;
