import { memo, useState } from 'react';
import dayjs from 'dayjs';
import { Container, Stack, Alert as MuiAlert, Divider } from '@mui/material';

import SearchBody from '../../../components/search/SearchBody';
import SearchHeader from '../../../components/search/SearchHeader';
import SavedSearchTag from '../../../components/SavedSearchTag/SavedSearchTag';
import SearchPageSkileton from '../../../components/searchPageSkileton/SearchPageSkileton';
import SearchAside from '../../../components/search/SearchAside';
import { usePersons } from '../../../components/context/persons';
import { bprSearchInitialFilters } from '../SearchPage.constants';
import useLikesData from '../../../hooks/useLikesData';
import { likeTypesMap } from '../../../utils/constants';

const BprSearchTab = () => {
  const [filterProps, setFilterProps] = useState(bprSearchInitialFilters);

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

  const { onLikeCreate, data: likesData } = useLikesData({
    likeTypeName: likeTypesMap.bpr.name,
  });

  function areFiltersUsed(filters) {
    return !!filters?.age?.min || !!filters?.age?.max || !!filters?.gender;
  }

  const filtersDisabled = !persons || (!areFiltersUsed(filterProps) && !persons?.length);

  const handleSearchSubmit = (e) => {
    setSearchParams(filterProps);
    changePage(1);
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

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFilterProps({ ...filterProps, [name]: value.trim().toUpperCase() });
  };

  const handleTagClick = (savedProps) => {
    if (!savedProps) return;
    setFilterProps({ ...bprSearchInitialFilters, ...savedProps });
  };

  const handleSaveButton = () => {
    onLikeCreate({ likeTypeName: likeTypesMap.bpr.name, fields: filterProps });
  };

  const handleClearButton = () => {
    setFilterProps(bprSearchInitialFilters);
    setSearchParams({});
    changePage(1);
  };

  const handleBirthDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format('DD/MM/YYYY') : '';
    onInputChange({
      target: { name: 'birthDate', value: formattedDate },
    });
  };

  return (
    <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
      <SearchAside
        onInputChange={onInputChange}
        onAgeChange={onAgeChange}
        handleSearchSubmit={handleSearchSubmit}
        filterProps={filterProps}
        disabled={filtersDisabled}
        isLoading={isInitialLoading}
      />
      <Divider orientation="vertical" variant="middle" flexItem />
      <Stack spacing={1} sx={{ width: '85%' }}>
        <Stack
          sx={{
            width: '100%',
            alignItems: 'center',
            pt: 2,
          }}
        >
          <SearchHeader
            filterProps={filterProps}
            onInputChange={onInputChange}
            onClearButton={handleClearButton}
            onSaveButtonClick={handleSaveButton}
            onBirthDateChange={handleBirthDateChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        </Stack>
        {likesData?.length > 0 && (
          <Container>
            <Stack gap={2} direction="row" justifyContent="center" flexWrap="wrap">
              {likesData.map((searchProps, index) => {
                return (
                  <SavedSearchTag
                    key={index}
                    {...searchProps.fields}
                    onTagClick={() => handleTagClick(searchProps.fields)}
                  />
                );
              })}
            </Stack>
          </Container>
        )}
        {error ? (
          <MuiAlert sx={{ mt: 2 }} severity="error">
            {error?.response?.data?.message || error.message}
          </MuiAlert>
        ) : isInitialLoading ? (
          <SearchPageSkileton />
        ) : !persons ? null : (
          <SearchBody
            persons={persons}
            changePage={changePage}
            totalCount={totalCount}
            currentPage={currentPage}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default memo(BprSearchTab);
