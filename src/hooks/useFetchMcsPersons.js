import { useQuery } from '@tanstack/react-query';

import { searchMcsPersons } from '../api/personsApi';

const useFetchMcsPersons = (filters) => {
  return useQuery(['search-mcs-persons', filters], () => searchMcsPersons(filters), {
    keepPreviousData: false,
    enabled: !!Object.keys(filters).length,
  });
};

export default useFetchMcsPersons;
