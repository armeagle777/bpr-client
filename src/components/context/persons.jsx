import { createContext, useContext, useState } from 'react';
import useFetchPersons from '../../hooks/useFetchPersons';

import { perPageCount } from '../../utils/constants';
import { countForFilter } from '../../utils/configs';

const PersonsContext = createContext(null);

export const PersonsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: persons,
    isLoading,
    isFetching,
    isInitialLoading,
    isError,
    error,
  } = useFetchPersons(searchParams);
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
    <PersonsContext.Provider
      value={{
        persons: paginatedPersons,
        isInitialLoading,
        searchParams,
        setSearchParams,
        currentPage,
        changePage,
        totalCount: persons?.length,
        isError,
        error,
      }}
    >
      {children}
    </PersonsContext.Provider>
  );
};

export const usePersons = () => useContext(PersonsContext);
