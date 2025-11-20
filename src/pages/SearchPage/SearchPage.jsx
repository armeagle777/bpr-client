import { memo, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import useLikesData from '../../hooks/useLikesData';
import BprSearchTab from './components/BprSearchTab';
import CustomTabPanel from './components/CustomTabPanel';
import { initialAddressFilterProps, initialFilterProps } from './SearchPage.constants';
import SearchByImageTab from './components/SearchByImageTab';
import { usePersons } from '../../components/context/persons';
import { userHasPermission } from '../../utils/helperFunctions';
import useCadastreRegions from '../../hooks/useCadastreRegions';
import { likeTypesMap, permissionsMap } from '../../utils/constants';
import useCadastreCommunities from '../../hooks/useCadastreCommunities';
import useCadastreSettlements from '../../hooks/useCadastreSettlements';
import useCadastreStreets from '../../hooks/useCadastreStreets';
import SearchByAddressTab from './components/SearchByAddressTab';

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const SearchPage = () => {
  const [filterProps, setFilterProps] = useState(initialFilterProps);
  const [selectedTab, setSelectedTab] = useState(0);
  const [addressFilterProps, setAddressFilterProps] = useState(initialAddressFilterProps);
  const {
    error,
    persons,
    isError,
    changePage,
    totalCount,
    currentPage,
    setSearchParams,
    isInitialLoading,
  } = usePersons();
  const { regions } = useCadastreRegions({ enabled: true });
  const { communities, isFetching: communitiesFetching } = useCadastreCommunities({
    regionId: filterProps?.region?.regionId,
  });
  const { settlements, isFetching: settlementsFetching } = useCadastreSettlements({
    communityId: filterProps?.community?.communityId,
  });
  const { communities: addressCommunities, isFetching: addressCommunitiesFetching } =
    useCadastreCommunities({
      regionId: addressFilterProps?.regionOption?.regionId,
    });
  const { settlements: addressSettlements, isFetching: addressSettlementsFetching } =
    useCadastreSettlements({
      communityId: addressFilterProps?.communityOption?.communityId,
    });
  const { streets, isFetching: streetsFetching } = useCadastreStreets({
    settlementId: addressFilterProps?.residenceOption?.settlementId,
  });

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

  const handleSearchSubmit = (e) => {
    setSearchParams(filterProps);
    changePage(1);
  };

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setAddressFilterProps({ ...addressFilterProps, [name]: value.trim().toUpperCase() });
  };

  const handleAddressMatchTypeChange = (name, value) => {
    setAddressFilterProps((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSelectChange = (field, option) => {
    setAddressFilterProps((prev) => {
      if (field === 'region') {
        return {
          ...prev,
          regionOption: option,
          region: option?.name || '',
          communityOption: null,
          community: '',
          residenceOption: null,
          residence: '',
          streetOption: null,
          street: '',
        };
      }

      if (field === 'community') {
        return {
          ...prev,
          communityOption: option,
          community: option?.name || '',
          residenceOption: null,
          residence: '',
          streetOption: null,
          street: '',
        };
      }

      if (field === 'residence') {
        return {
          ...prev,
          residenceOption: option,
          residence: option?.name || '',
          streetOption: null,
          street: '',
        };
      }

      if (field === 'street') {
        return {
          ...prev,
          streetOption: option,
          street: option?.name || '',
        };
      }

      return prev;
    });
  };

  const handleAddressBirthDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format('DD/MM/YYYY') : '';
    setAddressFilterProps((prev) => ({ ...prev, birthDate: formattedDate }));
  };

  const normalizeAddressFilters = () => {
    const { regionOption, communityOption, residenceOption, streetOption, ...rest } =
      addressFilterProps;

    return {
      ...rest,
      region: rest.region || regionOption?.name || '',
      community: rest.community || communityOption?.name || '',
      residence: rest.residence || residenceOption?.name || '',
      street: rest.street || streetOption?.name || '',
      addressType: rest.addressType || 'LIVING',
      regionId: regionOption?.regionId || '',
      communityId: communityOption?.communityId || '',
      settlementId: residenceOption?.settlementId || '',
      streetId: streetOption?.streetId || '',
    };
  };

  const handleAddressSearchSubmit = () => {
    setSearchParams(normalizeAddressFilters());
    changePage(1);
  };

  const handleAddressClearButton = () => {
    setAddressFilterProps(initialAddressFilterProps);
    setSearchParams({});
    changePage(1);
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
          error={error}
          isError={isError}
          persons={persons}
          regions={regions}
          likesData={likesData}
          totalCount={totalCount}
          changePage={changePage}
          communities={communities}
          settlements={settlements}
          currentPage={currentPage}
          filterProps={filterProps}
          onAgeChange={onAgeChange}
          onInputChange={onInputChange}
          handleTagClick={handleTagClick}
          isInitialLoading={isInitialLoading}
          handleSaveButton={handleSaveButton}
          handleClearButton={handleClearButton}
          handleSearchSubmit={handleSearchSubmit}
          onBirthDateChange={handleBirthDateChange}
          settlementsFetching={settlementsFetching}
          communitiesFetching={communitiesFetching}
        />
      </CustomTabPanel>
      {showSearchByImageTab && (
        <CustomTabPanel value={selectedTab} index={1}>
          <SearchByImageTab />
        </CustomTabPanel>
      )}
      <CustomTabPanel value={selectedTab} index={0}>
        <SearchByAddressTab
          error={error}
          persons={persons}
          isError={isError}
          regions={regions}
          streets={streets}
          totalCount={totalCount}
          changePage={changePage}
          settlements={addressSettlements}
          communities={addressCommunities}
          currentPage={currentPage}
          filters={addressFilterProps}
          onInputChange={handleAddressInputChange}
          onSelectChange={handleAddressSelectChange}
          onBirthDateChange={handleAddressBirthDateChange}
          onMatchTypeChange={handleAddressMatchTypeChange}
          onSearchSubmit={handleAddressSearchSubmit}
          onClear={handleAddressClearButton}
          isInitialLoading={isInitialLoading}
          settlementsFetching={addressSettlementsFetching}
          communitiesFetching={addressCommunitiesFetching}
          streetsFetching={streetsFetching}
        />
      </CustomTabPanel>
    </>
  );
};

export default memo(SearchPage);
