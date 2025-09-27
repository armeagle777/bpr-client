import { Container, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import SearchBody from '../components/search/SearchBody';
import SearchPageSkileton from '../components/searchPageSkileton/SearchPageSkileton';
import { usePersons } from '../components/context/persons';
import PersonNotFound from '../components/notFound/PersonNotFound';
import SearchHeader from '../components/search/SearchHeader';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useLikesData from '../hooks/useLikesData';
import { likeTypesMap } from '../utils/constants';
import SavedSearchTag from '../components/SavedSearchTag/SavedSearchTag';
import ImageEditorModal from '../components/search/ImageSearchModal';

const initialFilterProps = {
  ssn: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  patronomicName: '',
  documentNumber: '',
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

  const { onLikeCreate, data: likesData } = useLikesData({
    likeTypeName: likeTypesMap.bpr.name,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.refetchQueries(['search-persons', filters]);
      setSearchParams({});
    };
  }, [setSearchParams, queryClient, filters]);

  if (isInitialLoading) {
    return <SearchPageSkileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  const handleClearButton = () => {
    setFilterProps(initialFilterProps);
    setSearchParams({});
    changePage(1);
  };

  const handleSaveButton = () => {
    onLikeCreate({ likeTypeName: likeTypesMap.bpr.name, fields: filterProps });
  };

  return (
    <>
      <Stack
        sx={{
          width: '100%',
          alignItems: 'center',
          pt: 2,
        }}
      >
        <SearchHeader
          changePage={changePage}
          setSearchParams={setSearchParams}
          filterProps={filterProps}
          setFilterProps={setFilterProps}
          onClearButton={handleClearButton}
          onSaveButtonClick={handleSaveButton}
        />
      </Stack>
      {likesData?.length > 0 && (
        <Container>
          <Stack gap={2} direction="row" justifyContent="center" flexWrap="wrap">
            {likesData.map((searchProps, index) => (
              <SavedSearchTag
                key={index}
                {...searchProps.fields}
                onTagClick={() => setFilterProps(searchProps)}
              />
            ))}
          </Stack>
        </Container>
      )}
      {!persons ? null : persons?.length === 0 ? (
        <PersonNotFound />
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
