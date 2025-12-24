import { useMemo } from 'react';
import { Grid, Alert as MuiAlert, Stack } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import useFetchRoadpoliceData from '../../hooks/useFetchRoadpoliceData';
import ListScileton from '../listSceleton/ListScileton';
import LicenseCard from '../LicenseCard/LicenseCard';
import VehicleCard from '../VehicleCard/VehicleCard';
import NoResults from '../NoResults/NoResults';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import RoadPoliceReport from '../pdf-templates/RoadPoliceReport';

const RoadPoliceTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchRoadpoliceData(pnum);
  const user = useAuthUser();

  const license = data?.license || {};
  const vehicles = Array.isArray(data?.vehicles) ? data.vehicles : [];
  const showLicense = license && Object.keys(license)?.length > 0;
  const showVehicleCards = vehicles.length > 0;
  const hasExportData = showLicense || showVehicleCards;

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safePnum = typeof pnum === 'string' ? pnum.replace(/[^\w-]/g, '_') : 'report';
    return `road_police_${safePnum || 'report'}.pdf`;
  }, [pnum]);

  const exportButton = hasExportData ? (
    <PDFGenerator
      PDFTemplate={RoadPoliceReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ PNum: pnum, license: showLicense ? license : null, vehicles }}
      userFullName={userFullName}
    />
  ) : null;

  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  return (
    <Stack direction="column" gap={4}>
      {exportButton && (
        <Stack direction="row" justifyContent="flex-end">
          {exportButton}
        </Stack>
      )}
      {!showLicense && !showVehicleCards && <NoResults />}
      <Grid container>{showLicense && <LicenseCard license={license} />}</Grid>
      <Grid container spacing={2}>
        {showVehicleCards &&
          vehicles.map((vehicleInfo, index) => <VehicleCard key={index} car={vehicleInfo} />)}
      </Grid>
    </Stack>
  );
};

export default RoadPoliceTab;
