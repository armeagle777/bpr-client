import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import BprSearchTab from './components/BprSearchTab';
import CustomTabPanel from './components/CustomTabPanel';
import SearchByImageTab from './components/SearchByImageTab';
import { userHasPermission } from '../../utils/helperFunctions';
import { permissionsMap } from '../../utils/constants';
import SearchByAddressTab from './components/SearchByAddressTab';

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const SearchPage = () => {
  const user = useAuthUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const showSearchByImageTab = userHasPermission(
    [permissionsMap.SEARCH_PERSON_BY_IMAGE.uid, permissionsMap.ADMIN.uid],
    user.permissions
  );

  const availableTabs = showSearchByImageTab ? ['address', 'image', 'bpr'] : ['address', 'bpr'];
  const tabFromUrl = searchParams.get('tab');
  const selectedTabKey = availableTabs.includes(tabFromUrl) ? tabFromUrl : availableTabs[0];
  const selectedTab = availableTabs.indexOf(selectedTabKey);

  useEffect(() => {
    if (tabFromUrl === selectedTabKey) return;
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('tab', selectedTabKey);
    setSearchParams(nextSearchParams, { replace: true });
  }, [searchParams, selectedTabKey, setSearchParams, tabFromUrl]);

  const handleTabsChange = (_, newValue) => {
    const nextTabKey = availableTabs[newValue];
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('tab', nextTabKey);
    setSearchParams(nextSearchParams, { replace: true });
  };

  return (
    <>
      <Box sx={{ paddingTop: 2, paddingLeft: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabsChange} aria-label="Person Search Tabs">
          <Tab label="Որոնում հասցեով" />
          {showSearchByImageTab && <Tab label="Որոնում Լուսանկարով" />}
          <Tab label="ԲՊՌ Որոնում" />
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={showSearchByImageTab ? 2 : 1}>
        <BprSearchTab />
      </CustomTabPanel>
      {showSearchByImageTab && (
        <CustomTabPanel value={selectedTab} index={1}>
          <SearchByImageTab />
        </CustomTabPanel>
      )}
      <CustomTabPanel value={selectedTab} index={0}>
        <SearchByAddressTab />
      </CustomTabPanel>
    </>
  );
};

export default memo(SearchPage);
