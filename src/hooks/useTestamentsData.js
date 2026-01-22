import { useQuery } from '@tanstack/react-query';

import { getEscsTestamentData } from '../api/personsApi';

const useTestamentsData = (ssn) => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
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
    isFetching,
    data,
  };
};

export default useTestamentsData;
