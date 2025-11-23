import { memo } from 'react';
import { Stack, Pagination, Divider, Box } from '@mui/material';

import SearchRow from './SearchRow';
import NoResults from '../NoResults/NoResults';
import { perPageCount } from '../../utils/constants';
import { countForFilter } from '../../utils/configs';
import McsPersonSearchRow from './McsPersonSearchRow';

const AddressSearchBody = ({ persons, totalCount, changePage, currentPage }) => {
  const showExtended = totalCount >= countForFilter;

  return (
    <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
      <Stack spacing={1} sx={{ width: '100%', px: 2, pb: 4, alignItems: 'center' }}>
        {!persons?.length ? (
          <Box width="100%">
            <NoResults />
          </Box>
        ) : (
          persons?.map((person, index) => (
            <Stack width="100%" key={person.PNum} spacing={1} direction="column">
              <McsPersonSearchRow data={person} />
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

export default memo(AddressSearchBody);
