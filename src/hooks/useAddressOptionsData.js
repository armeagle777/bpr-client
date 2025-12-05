import { useQuery } from '@tanstack/react-query';

import { ADDRESS_REGIONS } from '../utils/constants';
import { getAddressCommunities, getAddressResidences, getAddressStreets } from '../api/personsApi';

const useAddressOptionsData = (filterProps) => {
  const { region, community, residence } = filterProps || {};

  const shouldGetCommunities = !!region;
  const shouldGetResidences =
    !!region && !!community && region !== 'ԵՐԵՎԱՆ' && community !== 'ԳՅՈՒՄՐԻ';
  const shouldGetStreets =
    !!region &&
    (!!residence || (!!community && region === 'ԵՐԵՎԱՆ') || (!!region && community === 'ԳՅՈՒՄՐԻ'));

  const { data: communities, isFetching: communitiesFetching } = useQuery(
    ['address-communities', { region }],
    () => getAddressCommunities(region),
    {
      keepPreviousData: true,
      enabled: shouldGetCommunities,
    }
  );

  const { data: residences, isFetching: residencesFetching } = useQuery(
    ['address-residences', { region, community }],
    () => getAddressResidences({ region, community }),
    {
      keepPreviousData: false,
      enabled: shouldGetResidences,
    }
  );

  const { data: streets, isFetching: streetsFetching } = useQuery(
    ['address-streets', { region, community, residence }],
    () => getAddressStreets({ region, community, residence }),
    {
      keepPreviousData: false,
      enabled: shouldGetStreets,
    }
  );

  const filteredCommunities = communities?.filter((com) => {
    if (filterProps?.region !== 'ԵՐԵՎԱՆ') return com;
    return filterProps.addressType === 'LIVING' ? com.name !== 'ԵՐԵՎԱՆ' : com.name === 'ԵՐԵՎԱՆ';
  });
  return {
    regions: ADDRESS_REGIONS,
    communities: filteredCommunities,
    residences,
    streets,
    communitiesFetching,
    residencesFetching,
    streetsFetching,
  };
};

export default useAddressOptionsData;
