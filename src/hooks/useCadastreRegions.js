import { useQuery } from '@tanstack/react-query';
import { getCadastreRegions } from '../api/personsApi';

const useCadastreRegions = ({ enabled = false }) => {
  const { data, error, isError, isFetching } = useQuery(
    ['cadastre-regions'],
    () => getCadastreRegions(),
    {
      keepPreviousData: true,
      enabled,
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

  return { regions: formatedRegions, error, isError, isFetching };
};

export default useCadastreRegions;
