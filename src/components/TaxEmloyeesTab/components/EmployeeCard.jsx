import {
  Box,
  Card,
  Chip,
  Avatar,
  Divider,
  Accordion,
  Typography,
  CardContent,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import { memo } from "react";

const EmployeeCard = ({ data }) => {
  const { personalinfo, positions, isActiveEmployee } = data;
  const { firstname, lastname, birthdate } = personalinfo;

  // later replace with actual fetched image url
  const imageUrl = "";

  return (
    <Card
      sx={{
        maxWidth: 340,
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Profile Image */}
      <Box sx={{ p: 2, position: "relative" }}>
        <Avatar
          src={imageUrl}
          alt={`${firstname} ${lastname}`}
          sx={{ width: 150, height: 150, borderRadius: 2 }}
        >
          {firstname?.[0]}
          {lastname?.[0]}
        </Avatar>

        {/* Status Indicator */}
        {isActiveEmployee && (
          <Chip
            icon={
              <CircleIcon
                sx={{
                  fontSize: 12,
                }}
                color="success"
              />
            }
            label="Active"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "green",
              bgcolor: "white",
              fontWeight: "bold",
            }}
          />
        )}
      </Box>

      {/* Info */}
      <CardContent sx={{ textAlign: "center", pb: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textTransform: "uppercase", mb: 1 }}
        >
          {firstname}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textTransform: "uppercase", mb: 1 }}
        >
          {lastname}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Ծննդ ա/թ: {birthdate}
        </Typography>
      </CardContent>

      {/* Accordion for Positions */}

      <Accordion sx={{ width: "100%", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Դրույքներ
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {positions?.map((pos, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                {pos.positionname}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {pos.startdate} – {pos.enddate || "Present"}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ width: "100%" }} />
    </Card>
  );
};

export default memo(EmployeeCard);
