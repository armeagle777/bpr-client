import { useQuery } from '@tanstack/react-query';
import { getCadastreSettlements } from '../api/personsApi';

const useCadastreSettlements = ({ communityId }) => {
  const { data, error, isError, isFetching } = useQuery(
    ['cadastre-settlements', communityId],
    () => getCadastreSettlements(communityId),
    {
      keepPreviousData: true,
      enabled: !!communityId,
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
  return { settlements: formatedCommunities, error, isError, isFetching };
};

export default useCadastreSettlements;
