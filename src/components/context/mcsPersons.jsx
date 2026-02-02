import { createContext, useContext, useState } from 'react';
import useFetchMcsPersons from '../../hooks/useFetchMcsPersons';

import { perPageCount } from '../../utils/constants';
import { countForFilter } from '../../utils/configs';
import { addressSearchInitialFilters } from '../../pages/SearchPage/SearchPage.constants';

const McsPersonsContext = createContext(null);

export const McsPersonsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [addressFilters, setAddressFilters] = useState(addressSearchInitialFilters);

  const {
    data: persons,
    isLoading,
    isFetching,
    isInitialLoading,
    isError,
    error,
  } = useFetchMcsPersons(searchParams);
  const changePage = (pg) => {
    setCurrentPage(pg);
  };

  const paginatedPersons =
    persons?.length <= countForFilter
      ? persons
      : Array.isArray(persons)
      ? persons?.filter(
          (pers, index) =>
            index >= (currentPage - 1) * perPageCount && index <= currentPage * perPageCount - 1
        )
      : persons;

  return (
    <McsPersonsContext.Provider
      value={{
        persons: paginatedPersons,
        isInitialLoading,
        searchParams,
        setSearchParams,
        currentPage,
        changePage,
        totalCount: persons?.length,
        addressFilters,
        setAddressFilters,
        isError,
        error,
      }}
    >
      {children}
    </McsPersonsContext.Provider>
  );
};

export const useMcsPersons = () => useContext(McsPersonsContext);
