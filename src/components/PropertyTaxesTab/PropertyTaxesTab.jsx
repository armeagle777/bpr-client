import { useMemo, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import DataLoader from '../DataLoader/DataLoader';
import PhysicalVehicleCard from './components/PhysicalVehicleCard';
import PhysicalPropertyCard from './components/PhysicalPropertyCard';
import LegalPropertyCard from './components/LegalPropertyCard';
import useTerritorialMinPropertyTaxesData from '../../hooks/useTerritorialMinPropertyTaxesData';
import LegalVehicleCard from './components/LegalVehicleCard';
import NoResults from '../NoResults/NoResults';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import PropertyTaxesReport from '../pdf-templates/PropertyTaxesReport';

const PropertyTaxesTab = ({ identificatorNumber, personType = 'PHYSICAL' }) => {
  const [serviceType, setServiceType] = useState('REAL_ESTATE');
  const user = useAuthUser();

  const realEstateQuery = useTerritorialMinPropertyTaxesData({
    serviceType: 'REAL_ESTATE',
    identificator: identificatorNumber,
    personType,
  });

  const vehiclesQuery = useTerritorialMinPropertyTaxesData({
    serviceType: 'VEHICLES',
    identificator: identificatorNumber,
    personType,
  });

  const handleTabChange = (e, newValue) => {
    setServiceType(newValue);
  };

  const isFetching =
    serviceType === 'REAL_ESTATE' ? realEstateQuery.isFetching : vehiclesQuery.isFetching;
  const error = serviceType === 'REAL_ESTATE' ? realEstateQuery.error : vehiclesQuery.error;
  const data = serviceType === 'REAL_ESTATE' ? realEstateQuery.data : vehiclesQuery.data;
  const hasAnyData = Boolean((realEstateQuery.data || []).length || (vehiclesQuery.data || []).length);

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safeId =
      typeof identificatorNumber === 'string'
        ? identificatorNumber.replace(/[^\w-]/g, '_')
        : 'report';
    return `property_taxes_${safeId || 'report'}.pdf`;
  }, [identificatorNumber]);

  const exportButton = hasAnyData ? (
    <PDFGenerator
      PDFTemplate={PropertyTaxesReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{
        identificator: identificatorNumber,
        personType,
        realEstate: realEstateQuery.data || [],
        vehicles: vehiclesQuery.data || [],
      }}
      userFullName={userFullName}
    />
  ) : null;

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          Գույքահարկի Վճարների Վերաբերյալ Տեղեկատվություն
        </Typography>
        {exportButton}
      </Stack>
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
          {serviceType === 'REAL_ESTATE' &&
            !!data?.length &&
            data?.map((item, idx) =>
              personType === 'PHYSICAL' ? (
                <PhysicalPropertyCard item={item} key={idx} />
              ) : (
                <LegalPropertyCard item={item} key={idx} />
              )
            )}

          {serviceType === 'VEHICLES' &&
            data?.map((item, idx) =>
              personType === 'PHYSICAL' ? (
                <PhysicalVehicleCard key={idx} item={item} />
              ) : (
                <LegalVehicleCard key={idx} item={item} />
              )
            )}

          {!data?.length && <NoResults />}
        </Box>
      )}
    </Box>
  );
};

export default PropertyTaxesTab;
