import { memo } from 'react';
import { Container } from '@mui/material';

import WeaponsSearchHeader from './components/WeaponsSearchHeader';
import MuiTable from '../../components/MuiTable/MuiTable';
import useSearchWeapons from '../../hooks/useSearchWeapons';
import DataLoader from '../../components/DataLoader/DataLoader';

const WeaponSearch = () => {
  const {
    data,
    error,
    isError,
    columns,
    isLoading,
    isFetching,
    searchBase,
    searchInput,
    setSearchInput,
    handleSubmitSearch,
    handleBaseChange,
  } = useSearchWeapons();
  return (
    <Container>
      <WeaponsSearchHeader
        searchBase={searchBase}
        isFetching={isFetching}
        searchInput={searchInput}
        handleBaseChange={handleBaseChange}
        setSearchInput={setSearchInput}
        handleSubmitSearch={handleSubmitSearch}
      />
      {isFetching && <DataLoader />}

      {Array.isArray(data) && <MuiTable rows={data} columns={columns} />}
    </Container>
  );
};

export default memo(WeaponSearch);
