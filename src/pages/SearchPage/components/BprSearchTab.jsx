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
  filters,
  regions,
  likesData,
  changePage,
  totalCount,
  setFilters,
  currentPage,
  communities,
  settlements,
  settlementsFetching,
  filterProps,
  handleTagClick,
  setFilterProps,
  setSearchParams,
  isInitialLoading,
  handleSaveButton,
  handleClearButton,
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
          changePage={changePage}
          communities={communities}
          filterProps={filterProps}
          settlements={settlements}
          settlementsFetching={settlementsFetching}
          setFilterProps={setFilterProps}
          setSearchParams={setSearchParams}
          onClearButton={handleClearButton}
          onSaveButtonClick={handleSaveButton}
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
          filters={filters}
          changePage={changePage}
          totalCount={totalCount}
          setFilters={setFilters}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default memo(BprSearchTab);
