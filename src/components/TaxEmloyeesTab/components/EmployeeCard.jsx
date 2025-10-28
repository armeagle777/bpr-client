import { memo, useMemo, useState } from "react";
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
  Drawer,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import {
  Circle as CircleIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useInView } from "react-intersection-observer";

import useFetchPerson from "../../../hooks/useFetchPerson";
import { getBestPhoto } from "../TaxEmployeesTab.helpers";

const EmployeeCard = ({ data }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const handleCardClick = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
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
      <CardContent
        sx={{
          textAlign: "center",
          pb: 1,
          cursor: "pointer",
        }}
        onClick={handleCardClick}
      >
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
                {pos.startdate} – {pos.enddate || "Հիմա"}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ width: "100%" }} />

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 600, md: 800 },
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h5" fontWeight="bold" color="primary">
              Աշխատակցի Վերաբերյալ Տեղեկատվություն
            </Typography>
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* Personal Info */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Անձնական Տվյալներ
            </Typography>
            <Stack spacing={1}>
              <Typography>
                <strong>Անուն:</strong> {firstname}
              </Typography>
              <Typography>
                <strong>Ազգանուն:</strong> {lastname}
              </Typography>
              <Typography>
                <strong>Ծննդյան ամսաթիվ:</strong> {birthdate}
              </Typography>
              <Typography>
                <strong>ՀՀ ԱՆ:</strong> {ssn}
              </Typography>
            </Stack>
          </Paper>

          {/* Documents Section */}
          {personBprData?.documents && personBprData.documents.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Փաստաթղթեր
              </Typography>
              {personBprData.documents.map((doc, idx) => (
                <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: "grey.50" }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {doc.Document_Type}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Փաստաթղթի համար:</strong> {doc.Document_Number}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Վավեր է մինչև:</strong>{" "}
                    {doc.PassportData?.Passport_Validity_Date || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Կարգավիճակ:</strong> {doc.Document_Status}
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}

          {/* Addresses Section */}
          {personBprData?.addresses && personBprData.addresses.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Հասցեներ
              </Typography>
              {personBprData.addresses.map((address, idx) => (
                <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: "grey.50" }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Հասցե {idx + 1}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Տարածաշրջան:</strong>{" "}
                    {address.RegistrationAddress?.Region}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Համայնք:</strong>{" "}
                    {address.RegistrationAddress?.Community}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Փողոց:</strong>{" "}
                    {address.RegistrationAddress?.Street}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Տուն:</strong>{" "}
                    {address.RegistrationAddress?.Building}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Նամակագրության ինդեքս:</strong>{" "}
                    {address.RegistrationAddress?.Postal_Index}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Գրանցման ամսաթիվ:</strong>{" "}
                    {address.RegistrationData?.Registration_Date}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Գրանցման նպատակ:</strong>{" "}
                    {address.RegistrationData?.Registration_Aim?.AimName}
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}

          {/* Additional Info */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Լրացուցիչ Տվյալներ
            </Typography>
            <Stack spacing={1}>
              <Typography>
                <strong>PNum:</strong> {personBprData?.PNum || "N/A"}
              </Typography>
              <Typography>
                <strong>Կարգավիճակ:</strong>{" "}
                {personBprData?.SSN_Indicator ? "Ակտիվ" : "Ոչ ակտիվ"}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Drawer>
    </Card>
  );
};

export default memo(EmployeeCard);
