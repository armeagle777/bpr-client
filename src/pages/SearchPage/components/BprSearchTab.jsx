import { memo } from 'react';
import { Container, Stack, Alert as MuiAlert } from '@mui/material';

import SearchBody from '../../../components/search/SearchBody';
import SearchHeader from '../../../components/search/SearchHeader';
import SavedSearchTag from '../../../components/SavedSearchTag/SavedSearchTag';
import SearchPageSkileton from '../../../components/searchPageSkileton/SearchPageSkileton';
import { usePersons } from '../../../components/context/persons';

const BprSearchTab = ({
  likesData,
  onAgeChange,
  filterProps,
  onInputChange,
  handleTagClick,
  handleSaveButton,
  handleClearButton,
  onBirthDateChange,
}) => {
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

  const handleSearchSubmit = (e) => {
    setSearchParams(filterProps);
    changePage(1);
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
          onBirthDateChange={onBirthDateChange}
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
        <SearchBody
          persons={persons}
          changePage={changePage}
          totalCount={totalCount}
          onAgeChange={onAgeChange}
          filterProps={filterProps}
          currentPage={currentPage}
          isLoading={isInitialLoading}
          onInputChange={onInputChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}
    </>
  );
};

export default memo(BprSearchTab);
