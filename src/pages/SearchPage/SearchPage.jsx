import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import useLikesData from '../../hooks/useLikesData';
import BprSearchTab from './components/BprSearchTab';
import { useQueryClient } from '@tanstack/react-query';
import CustomTabPanel from './components/CustomTabPanel';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import SearchByImageTab from './components/SearchByImageTab';
import { usePersons } from '../../components/context/persons';
import { userHasPermission } from '../../utils/helperFunctions';
import { likeTypesMap, permissionsMap } from '../../utils/constants';
import { initialFilterProps } from './SearchPage.constants';

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const SearchPage = () => {
  const [filterProps, setFilterProps] = useState(initialFilterProps);
  const [selectedTab, setSelectedTab] = useState(0);
  const {
    error,
    filters,
    persons,
    isError,
    changePage,
    totalCount,
    setFilters,
    currentPage,
    filterCounts,
    setSearchParams,
    isInitialLoading,
  } = usePersons();

  const { onLikeCreate, data: likesData } = useLikesData({
    likeTypeName: likeTypesMap.bpr.name,
  });

  const queryClient = useQueryClient();
  const user = useAuthUser();

  useEffect(() => {
    return () => {
      queryClient.refetchQueries(['search-persons', filters]);
      setSearchParams({});
    };
  }, [setSearchParams, queryClient, filters]);

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

  return (
    <>
      <Box sx={{ paddingTop: 2, paddingLeft: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabsChange} aria-label="Person Search Tabs">
          <Tab label="ԲՊՌ Որոնում" />
          {userHasPermission(
            [permissionsMap.SEARCH_PERSON_BY_IMAGE.uid, permissionsMap.ADMIN.uid],
            user.permissions
          ) && <Tab label="Որոնում Լուսանկարով" />}
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <BprSearchTab
          error={error}
          isError={isError}
          persons={persons}
          filters={filters}
          likesData={likesData}
          setFilters={setFilters}
          totalCount={totalCount}
          changePage={changePage}
          currentPage={currentPage}
          filterProps={filterProps}
          filterCounts={filterCounts}
          handleTagClick={handleTagClick}
          setFilterProps={setFilterProps}
          setSearchParams={setSearchParams}
          isInitialLoading={isInitialLoading}
          handleSaveButton={handleSaveButton}
          handleClearButton={handleClearButton}
        />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <SearchByImageTab />
      </CustomTabPanel>
    </>
  );
};

export default memo(SearchPage);
