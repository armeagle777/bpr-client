import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getWeaponsData } from '../api/personsApi';
import { SEARCH_BASES } from '../pages/WeaponSearch/WeaponSearch.constants';

const useSearchWeapons = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weaponsSearchParams, setWeaponsSearchParams] = useState({});
  const [searchBase, setSearchBase] = useState('SSN');

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
      setWeaponsSearchParams({ searchBase: SEARCH_BASES[newBase], q: '' });
    }
  };
  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !searchInput) return;
    setWeaponsSearchParams({ q: q ?? searchInput, searchBase });
  };

  const { isFetching, isLoading, isError, error, data } = useQuery(
    ['weapons-search', weaponsSearchParams?.q, weaponsSearchParams?.searchBase],
    () =>
      getWeaponsData({
        [weaponsSearchParams?.searchBase]: weaponsSearchParams?.q,
      }),
    {
      keepPreviousData: false,
      enabled: !!weaponsSearchParams?.q,
    }
  );

  const columns = [
    { title: 'N', key: 'ZHAMAR' },
    { title: 'Անունը', key: 'ZANUN_NAME' },
    { title: 'Տեսակը', key: 'ZTYPE_NAME' },
    {
      title: 'Հասցե',
      key: 'HASCE',
      hiddenInMain: true,
      render: (row) =>
        `${row.HASCE || ''}, ${row.ABNAK || ''}, ${row.APOXOC || ''}, ${row.ASHENQ || ''} ${
          row.ABNAKARAN || ''
        }`,
    },
    { title: 'Փ/թ', key: 'PASSPORT', hiddenInMain: true },
    { title: 'Թույլտվության տ/կ', key: 'TTYPE_NAME', hiddenInMain: true },
    { title: 'Թույլտվության ա/թ', key: 'TDATE', hiddenInMain: true },
    { title: 'Պատկանում է', key: 'ZPATK1_NAME', hiddenInMain: true },
    { title: 'Գրանցված է', key: 'GRANC_NAME', hiddenInMain: true },
    { title: 'Բաժինը', key: 'TBAJIN', hiddenInMain: true },
    {
      title: 'ԱԱՀ',
      key: 'AZG',
      render: (row) => `${row.ANUN || ''} ${row.AZG || ''} ${row.HAYR || ''}`,
    },
    { title: 'Ծննդ. ա/թ', key: 'BDATE' },
    { title: 'ՀԾՀ / ՀՎՀՀ', key: 'SSN' },
    { title: 'Տ/չ', key: 'KALIBR' },
  ];

  return {
    data,
    error,
    isError,
    columns,
    isLoading,
    isFetching,
    searchBase,
    searchInput,
    setSearchInput,
    handleBaseChange,
    handleSubmitSearch,
  };
};

export default useSearchWeapons;
