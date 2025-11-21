import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import SearchRowSkileton from './SearchRowSkileton';
import CheckBoxSkeleton from './CheckBoxSkeleton';

const SearchPageSkileton = () => {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', pt: 2 }}>
        {/* <Stack sx={{ width: '15%' }}>
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <Skeleton width={70} />
                        <Skeleton width='70%' height={40} />
                    </Box>
                    <Stack spacing={1} sx={{ width: '100%', mb: 2 }}>
                        <Skeleton sx={{ width: 70, height: 25 }} />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                    </Stack>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <Skeleton sx={{ width: 70, height: 25 }} />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                        <CheckBoxSkeleton />
                    </Stack>
                </Stack>
                <Divider orientation='vertical' variant='middle' flexItem /> */}
        <Stack spacing={1} sx={{ width: '80%', px: 2, pb: 4, alignItems: 'center' }}>
          <SearchRowSkileton />
          <Divider variant="middle" flexItem />
          <SearchRowSkileton />
          <Divider variant="middle" flexItem />
          <SearchRowSkileton />
          <Divider variant="middle" flexItem />
          <SearchRowSkileton />
          <Divider variant="middle" flexItem />
          <SearchRowSkileton />
          <Stack sx={{ width: '100%', alignItems: 'center' }}>
            <Skeleton animation="wave" sx={{ width: 200, height: 35 }} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SearchPageSkileton;
