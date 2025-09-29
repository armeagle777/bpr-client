import { Stack, Pagination, Divider } from '@mui/material';

import { perPageCount } from '../../utils/constants';
import SearchAside from './SearchAside';
import SearchRow from './SearchRow';
import { countForFilter } from '../../utils/configs';

const SearchBody = ({
  persons,
  currentPage,
  changePage,
  totalCount,
  filters,
  setFilters,
  filterCounts,
}) => {
  const filtersDisabled = !persons || persons.length < 2;
  const showExtended = totalCount >= countForFilter;
  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', pt: 2 }}>
      <SearchAside
        filters={filters}
        setFilters={setFilters}
        showExtended={showExtended}
        persons={persons}
        filterCounts={filterCounts}
        disabled={filtersDisabled}
      />
      <Divider orientation="vertical" variant="middle" flexItem />
      <Stack spacing={1} sx={{ width: '80%', px: 2, pb: 4, alignItems: 'center' }}>
        {persons.map((person, index) => (
          <Stack width="100%" key={person.PNum} spacing={1} direction="column">
            <SearchRow personInfo={person} />
            {index < persons?.length - 1 && <Divider />}
          </Stack>
        ))}

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

export default SearchBody;
