import { Box, Grid, Alert as MuiAlert, Stack, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useMemo, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import NoResults from '../NoResults/NoResults';
import ListScileton from '../listSceleton/ListScileton';
import useFetchRoadPoliceViolations from '../../hooks/useFetchRoadPoliceViolations';
import { PageHeaderControls, ViolationsCardList, ViolationsTable } from './components';
import { pageViewsMap } from './RoadPoliceViolationsTab.constants';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import RoadPoliceViolationsReport from '../pdf-templates/RoadPoliceViolationsReport';

const RoadPoliceViolationsTab = ({ pnum }) => {
  const [view, setView] = useState(pageViewsMap.CARD);
  const { data, error, isError, isFetching } = useFetchRoadPoliceViolations(pnum);
  const user = useAuthUser();

  const handleViewChange = (e, next) => {
    if (next) setView(next);
  };

  const violations = Array.isArray(data) ? data : [];
  const hasData = violations.length > 0;

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safePnum = typeof pnum === 'string' ? pnum.replace(/[^\w-]/g, '_') : 'report';
    return `road_police_violations_${safePnum || 'report'}.pdf`;
  }, [pnum]);

  const exportButton = hasData ? (
    <PDFGenerator
      PDFTemplate={RoadPoliceViolationsReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={{ PNum: pnum, violations }}
      userFullName={userFullName}
    />
  ) : null;

  if (isFetching) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  return !hasData ? (
    <NoResults />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <PageHeaderControls view={view} onChangeView={handleViewChange}>
            {exportButton}
          </PageHeaderControls>
          {view === pageViewsMap.CARD ? (
            <ViolationsCardList violations={violations} />
          ) : (
            <ViolationsTable violations={violations} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default RoadPoliceViolationsTab;
