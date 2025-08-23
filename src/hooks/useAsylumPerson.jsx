import { useCallback, useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useQuery } from "@tanstack/react-query";

import {
  filterAsylumPersonData,
  getAsylumFilterOptionsData,
  getAsylumPersonFullData,
} from "../api/personsApi";
import { initialFilters } from "../pages/AsylumSearch/AsylumSearch.constants";

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
    queryKey: ["asylum-filter-options"],
    queryFn: getAsylumFilterOptionsData,
  });

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["asylum-person"],
    queryFn: () => filterAsylumPersonData(filters, page),
    enabled: false,
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
    queryKey: ["asylum-person-full-data", modalPersonProps],
    queryFn: () => getAsylumPersonFullData(modalPersonProps),
    enabled: !!modalPersonProps,
  });

  const isSubmitBtnLoading = useMemo(() => {
    return isFetching && page === 1;
  }, [isFetching, page]);

  useEffect(() => {
    if (isFullDataError) message.error("Ինչ-որ բան այնպես չէ");
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
      title: "Նկարը",
      dataIndex: "path",
      key: "path",
      render: (_, record) => (
        <Avatar
          src={record.path}
          alt="Profile Photo"
          variant="rounded"
          sx={{ width: 60, height: 80 }}
        />
      ),
    },
    {
      title: "Փաստաթուղթը",
      dataIndex: "passport_number",
      key: "passport_number",
    },
    {
      title: "ՀԾՀ",
      dataIndex: "ssn",
      key: "ssn",
      render: (_, record) =>
        record.ssn ? <Link to={`/bpr/${record.ssn}`}>{record.ssn}</Link> : "",
    },
    {
      title: "Քաղաքացիությունը",
      dataIndex: "arm_short",
      key: "arm_short",
      render: (_, record) => `${record.arm_short} | ${record.alpha_3}`,
    },
    {
      title: "Անունը (լատ)",
      dataIndex: "first_name_en",
      key: "first_name_en",
    },
    {
      title: "Ազգանունը (լատ)",
      dataIndex: "last_name_en",
      key: "last_name_en",
    },
    {
      title: "Անունը (hայ)",
      dataIndex: "first_name_am",
      key: "first_name_am",
    },
    {
      title: "Ազգանունը (hայ)",
      dataIndex: "last_name_am",
      key: "last_name_am",
    },
    {
      title: "Սեռը",
      dataIndex: "gender_id",
      key: "gender_id",
      render: (_, record) => (record.gender_id == 1 ? "Male" : "Female"),
    },
    {
      title: "Ծննդյան ա/թ",
      dataIndex: "birthday_day",
      key: "birthday",
      render: (_, record) =>
        `${record.birthday_day}.${record.birthday_month}.${record.birthday_year}`,
    },
    {
      title: "...",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <LoadingButton
          loading={modalPersonProps?.id === record.id && isFullDataFetching}
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
