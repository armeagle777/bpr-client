import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import NotFound from "./components/NotFound";
import DataLoader from "../DataLoader/DataLoader";
import VehicleCard from "./components/VehicleCard";
import PropertyCard from "./components/PropertyCard";
import useTerritorialMinPropertyTaxesData from "../../hooks/useTerritorialMinPropertyTaxesData";

const PropertyTaxesTab = ({ pnum }) => {
  const [serviceType, setServiceType] = useState("REAL_ESTATE");

  const { data, isFetching, error } = useTerritorialMinPropertyTaxesData({
    serviceType,
    identificator: pnum,
    personType: "PHYSICAL",
  });

  const handleTabChange = (e, newValue) => {
    setServiceType(newValue);
  };
  return (
    <Box>
      {/* Tabs */}
      <Tabs
        textColor="primary"
        value={serviceType}
        indicatorColor="primary"
        onChange={handleTabChange}
        aria-label="Service type tabs"
      >
        <Tab label="Անշարժ գույք" value="REAL_ESTATE" />
        <Tab label="Շարժական գույք" value="VEHICLES" />
      </Tabs>

      {/* Loading / Error states */}
      {isFetching && (
        <Box p={2}>
          <DataLoader />
        </Box>
      )}
      {error && (
        <Typography color="error" p={2}>
          Կապի խափանում
        </Typography>
      )}

      {/* Data View */}
      {!isFetching && data && (
        <Box p={2}>
          {serviceType === "REAL_ESTATE" &&
            !!data?.length &&
            data?.map((item, idx) => <PropertyCard item={item} key={idx} />)}

          {serviceType === "VEHICLES" &&
            data?.map((item, idx) => <VehicleCard key={idx} item={item} />)}

          {!data?.length && <NotFound />}
        </Box>
      )}
    </Box>
  );
};

export default PropertyTaxesTab;
