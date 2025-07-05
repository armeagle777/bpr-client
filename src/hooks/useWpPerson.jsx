import { useCallback, useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useQuery } from "@tanstack/react-query";

import { getWpPersonData, getWpPersonFullData } from "../api/personsApi";
import { initialFilters } from "../pages/WpPersonSearch/constants";

const useWpPerson = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [modalPersonProps, setModalPersonProps] = useState(null);

  const isFiltersChanged = useMemo(() => {
    return Object.values(filters).some((value) => Boolean(value));
  }, [filters]);

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["wp-person"],
    queryFn: () => getWpPersonData(filters, page),
    enabled: false,
  });

  const {
    data: fullData,
    isFetching: isFullDataFetching,
    isError: isFullDataError,
    error: fullDataError,
  } = useQuery({
    queryKey: ["wp-person-full-data", modalPersonProps],
    queryFn: () => getWpPersonFullData(modalPersonProps),
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
      const { id, tablename, user_id } = personProps;
      setModalPersonProps({ id, tablename, user_id });
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

  if (data?.data) {
    data.data = data.data.map((row, index) => ({ ...row, key: index }));
  }

  const columns = [
    {
      title: "Created At",
      dataIndex: "REG_DATE",
      key: "REG_DATE",
    },
    {
      title: "Type",
      dataIndex: "tablename",
      key: "tablename",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Passport",
      dataIndex: "passport_number",
      key: "passport_number",
    },
    {
      title: "Psn",
      dataIndex: "ssn",
      key: "ssn",
    },
    {
      title: "Country",
      dataIndex: "arm_short",
      key: "arm_short",
      render: (_, record) => `${record.arm_short} | ${record.alpha_3}`,
    },
    {
      title: "First Name",
      dataIndex: "first_name_en",
      key: "first_name_en",
    },
    {
      title: "Last Name",
      dataIndex: "last_name_en",
      key: "last_name_en",
    },
    {
      title: "Gender",
      dataIndex: "gender_id",
      key: "gender_id",
      render: (_, record) => (record.gender_id == 1 ? "Male" : "Female"),
    },
    {
      title: "Birth Day",
      dataIndex: "birthday_day",
      key: "birthday",
      render: (_, record) =>
        `${record.birthday_day}.${record.birthday_month}.${record.birthday_year}`,
    },
    {
      title: "Card N",
      dataIndex: "serial_number",
      key: "serial_number",
    },
    {
      title: "Card Issued",
      dataIndex: "issue_date",
      key: "issue_date",
    },
    {
      title: "Card Expiry",
      dataIndex: "expire_date",
      key: "expire_date",
    },
    {
      title: "Card Status",
      dataIndex: "card_status",
      key: "card_status",
    },
    {
      title: "Claim Status",
      dataIndex: "claim_status",
      key: "claim_status",
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
          info
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
    fullData,
  };
};

export default useWpPerson;
