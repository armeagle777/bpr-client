import { useQuery } from "@tanstack/react-query";

import { getSearchedPersons } from "../api/personsApi";

const useFetchPersons = (filters) => {
  return useQuery(
    ["search-persons", filters],
    () => getSearchedPersons(filters),
    {
      keepPreviousData: false,
      enabled: !!Object.keys(filters).length,
    }
  );
};

export default useFetchPersons;
