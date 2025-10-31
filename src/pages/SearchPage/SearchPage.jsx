import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Fade, Slide, useTheme, alpha } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import useLikesData from '../../hooks/useLikesData';
import BprSearchTab from './components/BprSearchTab';
import CustomTabPanel from './components/CustomTabPanel';
import { initialFilterProps } from './SearchPage.constants';
import SearchByImageTab from './components/SearchByImageTab';
import { usePersons } from '../../components/context/persons';
import { userHasPermission } from '../../utils/helperFunctions';
import useCadastreRegions from '../../hooks/useCadastreRegions';
import { likeTypesMap, permissionsMap } from '../../utils/constants';
import useCadastreCommunities from '../../hooks/useCadastreCommunities';
import useCadastreSettlements from '../../hooks/useCadastreSettlements';

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

  const theme = useTheme();

  return (
    <>
      <Fade in timeout={600}>
        <Box
          sx={{
            paddingTop: 3,
            paddingX: 3,
            borderBottom: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 100%)`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon color="primary" />
            </Box>
          </Box>
          <Tabs
            value={selectedTab}
            onChange={handleTabsChange}
            aria-label="Person Search Tabs"
            sx={{
              '& .MuiTab-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <Tab label="ԲՊՌ Որոնում" />
            {userHasPermission(
              [permissionsMap.SEARCH_PERSON_BY_IMAGE.uid, permissionsMap.ADMIN.uid],
              user.permissions
            ) && <Tab label="Որոնում Լուսանկարով" />}
          </Tabs>
        </Box>
      </Fade>
      <Slide direction="right" in={selectedTab === 0} mountOnEnter unmountOnExit timeout={400}>
        <Box>
          <CustomTabPanel value={selectedTab} index={0}>
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
              handleTagClick={handleTagClick}
              setFilterProps={setFilterProps}
              setSearchParams={setSearchParams}
              isInitialLoading={isInitialLoading}
              handleSaveButton={handleSaveButton}
              handleClearButton={handleClearButton}
              settlementsFetching={settlementsFetching}
              communitiesFetching={communitiesFetching}
            />
          </CustomTabPanel>
        </Box>
      </Slide>
      <Slide direction="right" in={selectedTab === 1} mountOnEnter unmountOnExit timeout={400}>
        <Box>
          <CustomTabPanel value={selectedTab} index={1}>
            <SearchByImageTab />
          </CustomTabPanel>
        </Box>
      </Slide>
    </>
  );
};

export default memo(SearchPage);
