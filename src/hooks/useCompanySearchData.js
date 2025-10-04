import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { filterCompanies } from '../api/personsApi';

const useCompanySearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchEnabled, setSearchEnabled] = useState(false);

  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    taxId: searchParams.get('taxId') || '',
    type: searchParams.get('type') || '',
  });
  const { isFetching, isError, error, data } = useQuery(
    ['search-companies', searchParams],
    () => filterCompanies(filters),
    {
      keepPreviousData: false,
      enabled: searchEnabled,
      cacheTime: 0,
    }
  );

  // Any search field change handler
  const handleFieldChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const changedValues = {
      [name]: value,
      ...(name === 'name' && value === '' ? { type: '' } : {}),
    };

    setFilters({ ...filters, ...changedValues });
    setSearchEnabled(false);
  };

  // When filters change → update URL
  const handleSearch = () => {
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.taxId) params.taxId = filters.taxId;
    if (filters.type) params.type = filters.type;
    setSearchParams(params);
    setSearchEnabled(true);
  };

  const handleReset = () => {
    setFilters({ name: '', taxId: '', type: '' });
    setSearchParams({});
    setSearchEnabled(false);
  };

  return {
    data,
    error,
    isError,
    filters,
    setFilters,
    isFetching,
    handleReset,
    handleSearch,
    handleFieldChange,
  };
};

export default useCompanySearchData;
