import { memo } from 'react';
import { Skeleton, Stack } from '@mui/material';

const AddressSearchSkeleton = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {[1, 2, 3].map((item) => (
        <Stack
          key={item}
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems="flex-start"
          sx={{ width: '100%' }}
        >
          <Skeleton variant="rectangular" width={140} height={180} sx={{ borderRadius: 1 }} />
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height={32} />
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="70%" />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <Stack spacing={1} sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="65%" />
              </Stack>
              <Skeleton variant="rectangular" width={150} height={36} sx={{ borderRadius: 1 }} />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default memo(AddressSearchSkeleton);
