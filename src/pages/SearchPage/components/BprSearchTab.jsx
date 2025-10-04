import { Container, Stack, Alert as MuiAlert } from '@mui/material';

import SearchBody from '../../../components/search/SearchBody';
import SearchHeader from '../../../components/search/SearchHeader';
import PersonNotFound from '../../../components/notFound/PersonNotFound';
import SavedSearchTag from '../../../components/SavedSearchTag/SavedSearchTag';
import SearchPageSkileton from '../../../components/searchPageSkileton/SearchPageSkileton';
import { initialFilterProps } from '../SearchPage.constants';

const BprSearchTab = ({
  error,
  isError,
  persons,
  filters,
  likesData,
  changePage,
  totalCount,
  setFilters,
  currentPage,
  filterProps,
  filterCounts,
  handleTagClick,
  setFilterProps,
  setSearchParams,
  isInitialLoading,
  handleSaveButton,
  handleClearButton,
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
          changePage={changePage}
          filterProps={filterProps}
          setFilterProps={setFilterProps}
          setSearchParams={setSearchParams}
          onClearButton={handleClearButton}
          onSaveButtonClick={handleSaveButton}
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
      ) : !persons ? null : persons?.length === 0 ? (
        <PersonNotFound />
      ) : (
        <SearchBody
          persons={persons}
          currentPage={currentPage}
          changePage={changePage}
          totalCount={totalCount}
          filters={filters}
          setFilters={setFilters}
          filterCounts={filterCounts}
        />
      )}
    </>
  );
};

export default BprSearchTab;
