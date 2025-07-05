import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import SearchBody from "../components/search/SearchBody";
import SearchPageSkileton from "../components/searchPageSkileton/SearchPageSkileton";
import { usePersons } from "../components/context/persons";
import PersonNotFound from "../components/notFound/PersonNotFound";
import SearchHeader from "../components/search/SearchHeader";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const initialFilterProps = {
  ssn: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  patronomicName: "",
  documentNumber: "",
};

const Search = () => {
  const [filterProps, setFilterProps] = useState(initialFilterProps);
  const {
    persons,
    isInitialLoading,
    setSearchParams,
    currentPage,
    changePage,
    totalCount,
    isError,
    error,
    filters,
    setFilters,
    filterCounts,
  } = usePersons();
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.refetchQueries(["search-persons", filters]);
      setSearchParams({});
    };
  }, [setSearchParams, queryClient, filters]);

  if (isInitialLoading) {
    return <SearchPageSkileton />;
  }

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  const handleClearButton = () => {
    setFilterProps(initialFilterProps);
    setSearchParams({});
    changePage(1);
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          pt: 2,
        }}
      >
        <SearchHeader
          changePage={changePage}
          setSearchParams={setSearchParams}
          filterProps={filterProps}
          setFilterProps={setFilterProps}
          onClearButton={handleClearButton}
        />
      </Stack>
      {!persons ? null : persons?.length === 0 ? (
        <PersonNotFound filterProps={filterProps} />
      ) : (
        <SearchBody
          persons={persons}
          currentPage={currentPage}
          changePage={changePage}
          totalCount={totalCount}
          filters={filters}
          setFilters={setFilters}
          filterCounts={filterCounts}
        />
      )}
    </>
  );
};

export default Search;
