import { memo, useState } from 'react';
import dayjs from 'dayjs';
import { Container, Stack, Alert as MuiAlert } from '@mui/material';

import SearchBody from '../../../components/search/SearchBody';
import SearchHeader from '../../../components/search/SearchHeader';
import SavedSearchTag from '../../../components/SavedSearchTag/SavedSearchTag';
import SearchPageSkileton from '../../../components/searchPageSkileton/SearchPageSkileton';
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

  const handleSearchSubmit = (e) => {
    setSearchParams(filterProps);
    changePage(1);
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

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  return (
    <>
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
      {isInitialLoading ? (
        <SearchPageSkileton />
      ) : !persons ? null : (
        (handleSearchSubmit,
        (
          <SearchBody
            persons={persons}
            changePage={changePage}
            totalCount={totalCount}
            currentPage={currentPage}
            handleSearchSubmit={handleSearchSubmit}
          />
        ))
      )}
    </>
  );
};

export default memo(BprSearchTab);
