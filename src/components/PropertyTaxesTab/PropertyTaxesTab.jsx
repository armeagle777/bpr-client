import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, CircularProgress } from "@mui/material";
import useTerritorialMinPropertyTaxesData from "../../hooks/useTerritorialMinPropertyTaxesData";

const PropertyTaxesTab = ({ pnum }) => {
  const [serviceType, setServiceType] = useState("REAL_ESTATE");

  const { data, isFetching, error } = useFetchTerritorialMinPropertyTaxes({
    identificator: pnum,
    personType: "PHYSICAL",
    serviceType,
  });

  const handleTabChange = (e, newValue) => {
    setServiceType(newValue);
  };
  return (
    <Box>
      {/* Tabs */}
      <Tabs
        value={serviceType}
        onChange={handleTabChange}
        aria-label="Service type tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Real Estate" value="REAL_ESTATE" />
        <Tab label="Vehicles" value="VEHICLES" />
      </Tabs>

      {/* Loading / Error states */}
      {isFetching && (
        <Box p={2}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" p={2}>
          Failed to load data
        </Typography>
      )}

      {/* Data View */}
      {!isFetching && data && (
        <Box p={2}>
          {serviceType === "REAL_ESTATE" &&
            data.real_estate_response?.map((item, idx) => (
              <Box
                key={idx}
                mb={2}
                p={2}
                border="1px solid #ccc"
                borderRadius={2}
              >
                <Typography variant="subtitle1">
                  Property: {item.physical_real_estate_service?.property_type}
                </Typography>
                {item.physical_real_estate_persons?.map((person, pIdx) => (
                  <Box key={pIdx} mt={1}>
                    <Typography>
                      {person.mta_get_taxes_last_name}{" "}
                      {person.mta_get_taxes_first_name}
                    </Typography>
                    {person.physical_real_estate_taxes?.map((t, tIdx) => (
                      <Typography key={tIdx} variant="body2">
                        {t.year}: {t.physical_real_estate_tax_item?.amount} ֏
                        {t.physical_real_estate_penalty &&
                          ` (Penalty: ${t.physical_real_estate_penalty.amount})`}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            ))}

          {serviceType === "VEHICLES" &&
            data.vehicle_response?.map((item, idx) => (
              <Box
                key={idx}
                mb={2}
                p={2}
                border="1px solid #ccc"
                borderRadius={2}
              >
                <Typography variant="subtitle1">
                  {item.physical_vehicles_service?.make}{" "}
                  {item.physical_vehicles_service?.type} (
                  {item.physical_vehicles_service?.vehicle_number})
                </Typography>
                {item.physical_vehicles_persons?.map((person, pIdx) => (
                  <Box key={pIdx} mt={1}>
                    <Typography>
                      {person.mta_get_taxes_last_name}{" "}
                      {person.mta_get_taxes_first_name}
                    </Typography>
                    {person.physical_vehicles_taxes?.map((t, tIdx) => (
                      <Typography key={tIdx} variant="body2">
                        {t.year}: {t.physical_vehicles_tax_item?.amount} ֏
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default PropertyTaxesTab;
