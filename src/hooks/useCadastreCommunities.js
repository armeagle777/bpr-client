import { useQuery } from '@tanstack/react-query';
import { getCadastreCommunities } from '../api/personsApi';

const useCadastreCommunities = ({ regionId }) => {
  const { data, error, isError, isFetching } = useQuery(
    ['cadastre-communities', regionId],
    () => getCadastreCommunities(regionId),
    {
      keepPreviousData: true,
      enabled: !!regionId,
    }
  );

  const formatedCommunities = data?.reduce(
    (acc, item, index) => {
      const modifiedName = item?.name === 'Երևան' ? 'ԵՐԵՎԱՆ' : item?.name?.toUpperCase();
      acc.push({ ...item, name: modifiedName });
      return acc;
    },
    [{ name: '-ԲԼՈՐԸ-', id: '' }]
  );
  return { communities: formatedCommunities, error, isError, isFetching };
};

export default useCadastreCommunities;
