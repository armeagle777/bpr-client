import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';

import {
  filterAsylumPersonData,
  getAsylumFilterOptionsData,
  getAsylumPersonFullData,
} from '../api/personsApi';
import { initialFilters } from '../pages/AsylumSearch/AsylumSearch.constants';

const useAsylumPerson = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [modalPersonProps, setModalPersonProps] = useState(null);

  const {
    data: asylumfilterOptionsData,
    isLoading: asylumFilterOptionsLoading,
    isError: asylumFilterOptionsIsError,
    error: asylumFilterOptionsError,
  } = useQuery({
    queryKey: ['asylum-filter-options'],
    queryFn: getAsylumFilterOptionsData,
  });

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ['asylum-person'],
    queryFn: () => filterAsylumPersonData(filters, page),
    enabled: false,
    keepPreviousData: false,
    cacheTime: 0,
  });

  const countriesOptions = useMemo(
    () =>
      asylumfilterOptionsData?.countries?.map((c) => ({
        value: c.country_id,
        label: c.country_arm,
      })) || [],
    [asylumfilterOptionsData]
  );

  const ethnicOptions = useMemo(
    () =>
      asylumfilterOptionsData?.ethnics?.map((e) => ({
        value: e.etnic_id,
        label: e.etnic_eng,
      })) || [],
    [asylumfilterOptionsData]
  );

  const religionOptions = useMemo(
    () =>
      asylumfilterOptionsData?.religions?.map((r) => ({
        value: r.religion_id,
        label: r.religion_arm,
      })) || [],
    [asylumfilterOptionsData]
  );

  const isFiltersChanged = useMemo(() => {
    return Object.values(filters).some((value) => Boolean(value));
  }, [filters]);

  const {
    data: fullData,
    isFetching: isFullDataFetching,
    isError: isFullDataError,
    error: fullDataError,
  } = useQuery({
    queryKey: ['asylum-person-full-data', modalPersonProps],
    queryFn: () => getAsylumPersonFullData(modalPersonProps),
    enabled: !!modalPersonProps,
    keepPreviousData: false,
  });

  const isSubmitBtnLoading = useMemo(() => {
    return isFetching && page === 1;
  }, [isFetching, page]);

  useEffect(() => {
    if (isFullDataError) toast.error('Ինչ-որ բան այնպես չէ');
  }, [isFullDataError]);

  useEffect(() => {
    if (page > 1) {
      refetch();
    }
  }, [page]);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setSelectedTab(newValue);
    },
    [setSelectedTab]
  );

  const handleChange = useCallback(
    (field, value) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    [setFilters]
  );

  const handleModalClose = useCallback(() => {
    setModalPersonProps(null);
    setSelectedTab(0);
    setIsModalOpen(false);
  }, [setIsModalOpen, setModalPersonProps]);

  const handleModalOpen = useCallback(
    (personProps) => {
      const { personal_id } = personProps;
      setModalPersonProps({ personal_id });
      setIsModalOpen(true);
    },
    [setIsModalOpen, setModalPersonProps]
  );

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
  }, [setFilters]);

  const handleSubmit = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch, setPage]);

  const handlePageChange = useCallback(
    (item) => {
      setPage(item);
    },
    [setPage]
  );

  const columns = [
    {
      title: 'Նկարը',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Avatar
          src={record.image}
          alt="Profile Photo"
          variant="rounded"
          sx={{ width: 60, height: 80 }}
        />
      ),
    },
    {
      title: 'Փաստաթուղթը',
      dataIndex: 'doc_num',
      key: 'doc_num',
    },
    {
      title: 'Քաղաքացիությունը',
      dataIndex: 'CITIZENSHIP_NAME_ARM',
      key: 'CITIZENSHIP_NAME_ARM',
      render: (_, record) => `${record.CITIZENSHIP_NAME_ARM} | ${record.CITIZENSHIP_NAME_ENG}`,
    },
    {
      title: 'Անունը (լատ)',
      dataIndex: 'f_name_eng',
      key: 'f_name_eng',
    },
    {
      title: 'Ազգանունը (լատ)',
      dataIndex: 'l_name_eng',
      key: 'l_name_eng',
    },
    {
      title: 'Անունը (hայ)',
      dataIndex: 'f_name_arm',
      key: 'f_name_arm',
    },
    {
      title: 'Ազգանունը (hայ)',
      dataIndex: 'l_name_arm',
      key: 'l_name_arm',
    },
    {
      title: 'Սեռը',
      dataIndex: 'sex',
      key: 'sex',
      render: (_, record) => (record.sex == 1 ? 'Արական' : 'Իգական'),
    },
    {
      title: 'Ծննդյան ա/թ',
      dataIndex: 'b_day',
      key: 'birthday',
      render: (_, record) => `${record.b_day}.${record.b_month}.${record.b_year}`,
    },
    {
      title: '...',
      dataIndex: '',
      key: 'action',
      render: (_, record) => (
        <LoadingButton
          loading={modalPersonProps?.personal_id === record.personal_id && isFullDataFetching}
          onClick={() => handleModalOpen(record)}
        >
          Մանրամասն
        </LoadingButton>
      ),
    },
  ];

  return {
    data,
    isError,
    columns,
    error,
    filters,
    isFetching,
    handleReset,
    isModalOpen,
    handleChange,
    handleSubmit,
    handlePageChange,
    selectedTab,
    handleTabChange,
    isFiltersChanged,
    handleModalClose,
    isSubmitBtnLoading,
    countriesOptions,
    ethnicOptions,
    religionOptions,
    fullData,
  };
};

export default useAsylumPerson;
