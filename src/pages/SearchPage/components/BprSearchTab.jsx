import { memo } from 'react';
import { Container, Stack, Alert as MuiAlert } from '@mui/material';

import SearchBody from '../../../components/search/SearchBody';
import SearchHeader from '../../../components/search/SearchHeader';
import SavedSearchTag from '../../../components/SavedSearchTag/SavedSearchTag';
import SearchPageSkileton from '../../../components/searchPageSkileton/SearchPageSkileton';

const BprSearchTab = ({
  error,
  isError,
  persons,
  regions,
  likesData,
  changePage,
  totalCount,
  onAgeChange,
  currentPage,
  communities,
  settlements,
  filterProps,
  onInputChange,
  handleTagClick,
  isInitialLoading,
  handleSaveButton,
  handleClearButton,
  onBirthDateChange,
  handleSearchSubmit,
  settlementsFetching,
  communitiesFetching,
}) => {
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
          regions={regions}
          communities={communities}
          filterProps={filterProps}
          onAgeChange={onAgeChange}
          settlements={settlements}
          onInputChange={onInputChange}
          onClearButton={handleClearButton}
          onSaveButtonClick={handleSaveButton}
          onBirthDateChange={onBirthDateChange}
          handleSearchSubmit={handleSearchSubmit}
          settlementsFetching={settlementsFetching}
          communitiesFetching={communitiesFetching}
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
