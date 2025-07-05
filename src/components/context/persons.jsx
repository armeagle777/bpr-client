import { createContext, useContext, useEffect, useState } from "react";
import { parse, differenceInYears } from "date-fns";
import useFetchPersons from "../../hooks/useFetchPersons";

import { filterDefaultObj, perPageCount } from "../../utils/constants";
import { countForFilter } from "../../utils/configs";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PersonsContext = createContext(null);

export const PersonsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    age: { min: null, max: null },
    gender: { male: 0, female: 0 },
    marz: null,
  });
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

  const filterPersons = (data, filters) => {
    return data.filter((item) => {
      //Age
      const birthDate = item.documents.find((doc) => doc.Person.Birth_Date)
        ?.Person?.Birth_Date;
      const date = parse(birthDate, "dd/MM/yyyy", new Date());
      const age = differenceInYears(new Date(), date);
      const ageCheck =
        (filters.age.min === null || age >= filters.age.min) &&
        (filters.age.max === null || age <= filters.age.max);

      const sex = item.documents.find((doc) => doc.Person?.Genus)?.Person
        ?.Genus;

      const genderCheck =
        (filters.gender.male === 1 && sex === "M") ||
        (filters.gender.female === 1 && sex === "F") ||
        (filters.gender.male === 1 && filters.gender.female === 1) ||
        (filters.gender.male === 0 && filters.gender.female === 0);

      const marzCheck = filters.marz === null || item.marz === filters.marz;

      return ageCheck && genderCheck && marzCheck;
    });
  };
  const filteredPersons = persons ? filterPersons(persons, filters) : persons;

  const paginatedPersons =
    filteredPersons?.length <= countForFilter
      ? filteredPersons
      : Array.isArray(filteredPersons)
      ? filteredPersons?.filter(
          (pers, index) =>
            index >= (currentPage - 1) * perPageCount &&
            index <= currentPage * perPageCount - 1
        )
      : filteredPersons;

  const filterCounts = persons?.reduce((acc, el) => {
    //Gender
    if (el.documents.find((doc) => doc.Person?.Genus === "M")) {
      acc.gender.maleCount++;
    } else if (el.documents.find((doc) => doc.Person?.Genus === "F")) {
      acc.gender.femaleCount++;
    }

    //Age
    const birthDate = el.documents.find((doc) => doc.Person.Birth_Date)?.Person
      .Birth_Date;
    const date = parse(birthDate, "dd/MM/yyyy", new Date());
    const age = differenceInYears(new Date(), date);

    if (acc.age[age] === undefined) {
      acc.age[age] = 1;
    } else {
      acc.age[age]++;
    }

    //Region

    return acc;
  }, JSON.parse(JSON.stringify(filterDefaultObj)));

  return (
    <PersonsContext.Provider
      value={{
        persons: paginatedPersons,
        isInitialLoading,
        searchParams,
        setSearchParams,
        currentPage,
        changePage,
        totalCount: filteredPersons?.length,
        isError,
        error,
        filters,
        setFilters,
        filterCounts,
      }}
    >
      {children}
    </PersonsContext.Provider>
  );
};

export const usePersons = () => useContext(PersonsContext);
