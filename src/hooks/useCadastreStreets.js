import { useQuery } from '@tanstack/react-query';

import { getCadastreStreets } from '../api/personsApi';

const useCadastreStreets = ({ settlementId }) => {
  const { data, error, isError, isFetching } = useQuery(
    ['cadastre-streets', settlementId],
    () => getCadastreStreets(settlementId),
    {
      keepPreviousData: true,
      enabled: !!settlementId,
    }
  );

  const formattedStreets = data?.reduce(
    (acc, item) => {
      acc.push({ ...item, name: item?.name?.toUpperCase() });
      return acc;
    },
    [{ name: '-ԲԼՈՐԸ-', streetId: '' }]
  );

  return { streets: formattedStreets, error, isError, isFetching };
};

export default useCadastreStreets;
