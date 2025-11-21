import { memo, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import useLikesData from '../../hooks/useLikesData';
import BprSearchTab from './components/BprSearchTab';
import CustomTabPanel from './components/CustomTabPanel';
import { initialFilterProps } from './SearchPage.constants';
import SearchByImageTab from './components/SearchByImageTab';
import { userHasPermission } from '../../utils/helperFunctions';
import useCadastreRegions from '../../hooks/useCadastreRegions';
import { likeTypesMap, permissionsMap } from '../../utils/constants';
import SearchByAddressTab from './components/SearchByAddressTab';

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const SearchPage = () => {
  const [filterProps, setFilterProps] = useState(initialFilterProps);
  const [selectedTab, setSelectedTab] = useState(0);

  const { regions } = useCadastreRegions({ enabled: true });
  // const { communities, isFetching: communitiesFetching } = useCadastreCommunities({
  //   regionId: filterProps?.region?.regionId,
  // });
  // const { settlements, isFetching: settlementsFetching } = useCadastreSettlements({
  //   communityId: filterProps?.community?.communityId,
  // });

  const { onLikeCreate, data: likesData } = useLikesData({
    likeTypeName: likeTypesMap.bpr.name,
  });

  const user = useAuthUser();

  const handleClearButton = () => {
    setFilterProps(initialFilterProps);
    setSearchParams({});
    changePage(1);
  };

  const handleSaveButton = () => {
    onLikeCreate({ likeTypeName: likeTypesMap.bpr.name, fields: filterProps });
  };

  const handleTabsChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTagClick = (savedProps) => {
    if (!savedProps) return;
    setFilterProps({ ...initialFilterProps, ...savedProps });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFilterProps({ ...filterProps, [name]: value.trim().toUpperCase() });
  };

  const onAgeChange = (event) => {
    const ageFilterOptions = { ageFrom: 'min', ageTo: 'max' };
    const { name, value } = event.target;
    const newValue = Math.max(Number(value), 0);
    setFilterProps({
      ...filterProps,
      age: { ...filterProps.age, [ageFilterOptions[name]]: newValue },
    });
  };

  const handleBirthDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format('DD/MM/YYYY') : '';
    onInputChange({
      target: { name: 'birthDate', value: formattedDate },
    });
  };

  const showSearchByImageTab = userHasPermission(
    [permissionsMap.SEARCH_PERSON_BY_IMAGE.uid, permissionsMap.ADMIN.uid],
    user.permissions
  );

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
        <BprSearchTab
          likesData={likesData}
          filterProps={filterProps}
          onInputChange={onInputChange}
          handleTagClick={handleTagClick}
          handleSaveButton={handleSaveButton}
          handleClearButton={handleClearButton}
          onBirthDateChange={handleBirthDateChange}
        />
      </CustomTabPanel>
      {showSearchByImageTab && (
        <CustomTabPanel value={selectedTab} index={1}>
          <SearchByImageTab />
        </CustomTabPanel>
      )}
      <CustomTabPanel value={selectedTab} index={0}>
        <SearchByAddressTab regions={regions} onAgeChange={onAgeChange} />
      </CustomTabPanel>
    </>
  );
};

export default memo(SearchPage);
