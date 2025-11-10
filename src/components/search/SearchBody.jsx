import { memo } from 'react';
import { Stack, Pagination, Divider } from '@mui/material';

import SearchRow from './SearchRow';
import { perPageCount } from '../../utils/constants';
import { countForFilter } from '../../utils/configs';
import PersonNotFound from '../notFound/PersonNotFound';
import SearchAside from './SearchAside';

const SearchBody = ({
  persons,
  isLoading,
  totalCount,
  changePage,
  onAgeChange,
  currentPage,
  filterProps,
  onInputChange,
  handleSearchSubmit,
}) => {
  const filtersDisabled = !persons || (!areFiltersUsed(filterProps) && !persons?.length);
  const showExtended = totalCount >= countForFilter;

  function areFiltersUsed(filters) {
    return !!filters?.age?.min || !!filters?.age?.max || !!filters?.region || !!filters?.gender;
  }

  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', pt: 2 }}>
      <SearchAside
        onInputChange={onInputChange}
        onAgeChange={onAgeChange}
        handleSearchSubmit={handleSearchSubmit}
        filterProps={filterProps}
        showExtended={showExtended}
        // filterCounts={filterCounts}
        disabled={filtersDisabled}
        isLoading={isLoading}
      />
      <Divider orientation="vertical" variant="middle" flexItem />
      <Stack spacing={1} sx={{ width: '80%', px: 2, pb: 4, alignItems: 'center' }}>
        {!persons?.length ? (
          <PersonNotFound />
        ) : (
          persons.map((person, index) => (
            <Stack width="100%" key={person.PNum} spacing={1} direction="column">
              <SearchRow personInfo={person} />
              {index < persons?.length - 1 && <Divider />}
            </Stack>
          ))
        )}

        {showExtended && (
          <Pagination
            count={Math.ceil(totalCount / perPageCount)}
            shape="rounded"
            color="primary"
            onChange={(_, newPage) => {
              changePage(newPage);
            }}
            page={currentPage}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default memo(SearchBody);
