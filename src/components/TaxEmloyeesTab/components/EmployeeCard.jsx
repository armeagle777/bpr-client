import { memo, useMemo } from "react";
import {
  Box,
  Card,
  Chip,
  Avatar,
  Divider,
  Skeleton,
  Accordion,
  Typography,
  CardContent,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Circle as CircleIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useInView } from "react-intersection-observer";

import useFetchPerson from "../../../hooks/useFetchPerson";
import { getBestPhoto } from "../TaxEmployeesTab.helpers";
import { Link } from "react-router-dom";

const EmployeeCard = ({ data }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { personalinfo, positions, isActiveEmployee } = data;
  const { firstname, lastname, birthdate, ssn } = personalinfo;

  const {
    data: personBprData,
    isError,
    isLoading,
  } = useFetchPerson(ssn, inView);

  const documents = personBprData?.documents;
  const imageUrl = getBestPhoto(documents) || "";

  const linkStyle = {
    textDecoration: "none",
    cursor: "pointer",
    color: "inherit",
  };

  return (
    <Card
      ref={ref}
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
        {isLoading ? (
          <Skeleton
            variant="rounded"
            width={150}
            height={150}
            sx={{ borderRadius: 2 }}
          />
        ) : (
          <Avatar
            src={imageUrl}
            alt={`${firstname} ${lastname}`}
            sx={{ width: 150, height: 150, borderRadius: 2 }}
          >
            {isError ? <PersonIcon /> : `${firstname?.[0]}${lastname?.[0]}`}
          </Avatar>
        )}

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
        <Link to={`/bpr/${ssn}`} style={linkStyle}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase", mb: 1 }}
          >
            {firstname}
          </Typography>
        </Link>
        <Link to={`/bpr/${ssn}`} style={linkStyle}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase", mb: 1 }}
          >
            {lastname}
          </Typography>
        </Link>
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
                {pos.startdate} – {pos.enddate || "Հիմա"}
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
