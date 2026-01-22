import { useQuery } from '@tanstack/react-query';

import { getEscsTestamentData } from '../api/personsApi';

const useTestamentsData = (ssn) => {
  const { isLoading, isError, error, data } = useQuery(
    ['escs-testaments', { ssn }],
    () => getEscsTestamentData(ssn),
    {
      keepPreviousData: true,
    }
  );

  return {
    error,
    isError,
    isLoading,
    data,
  };
};

export default useTestamentsData;
