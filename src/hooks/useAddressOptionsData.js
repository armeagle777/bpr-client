import { useQuery } from '@tanstack/react-query';

import { ADDRESS_REGIONS } from '../utils/constants';
import { getAddressCommunities } from '../api/personsApi';

const useAddressOptionsData = ({ region, community, settlement, residence }) => {
  const { data, error, isError, isFetching } = useQuery(
    ['address-communities'],
    () => getAddressCommunities(),
    {
      keepPreviousData: true,
      enabled: !!region,
    }
  );

  const formatedRegions = data?.reduce(
    (acc, item, index) => {
      const modifiedName = item?.name === 'Երևան' ? 'ԵՐԵՎԱՆ' : item?.name?.toUpperCase();
      acc.push({ ...item, name: modifiedName });
      return acc;
    },
    [{ name: '-ԲԼՈՐԸ-', id: '' }]
  );

  return { regions: ADDRESS_REGIONS };
};

export default useAddressOptionsData;
