import { memo } from 'react';
import { Stack, Pagination, Divider } from '@mui/material';

import SearchRow from './SearchRow';
import { perPageCount } from '../../utils/constants';
import { countForFilter } from '../../utils/configs';
import NoResults from '../NoResults/NoResults';

const SearchBody = ({ persons, totalCount, changePage, currentPage }) => {
  const showExtended = totalCount >= countForFilter;

  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', pt: 2 }}>
      <Stack spacing={1} sx={{ width: '80%', px: 2, pb: 4, alignItems: 'center' }}>
        {!persons?.length ? (
          <NoResults />
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
