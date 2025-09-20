import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { filterLogsData, getLightUsers, getLogTypes } from "../api/personsApi";

export const initialFilters = {
  user: null,
  logType: null,
};

const useLogsData = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["logs", filters, page],
    queryFn: () => filterLogsData(filters, page),
    // enabled: false,
    keepPreviousData: false,
    cacheTime: 0,
  });

  const { data: logTypes, isLoading: logTypesLoading } = useQuery({
    queryKey: ["log-types"],
    queryFn: () => getLogTypes(),
    keepPreviousData: true,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getLightUsers(),
    keepPreviousData: true,
  });

  const usersOptions =
    users?.users?.map((u) => ({
      label: u.firstName + " " + u.lastName,
      value: u.id,
    })) || [];

  const logTypeOptions =
    logTypes?.map((l) => ({
      label: l.name,
      value: l.id,
    })) || [];

  useEffect(() => {
    if (page > 1) {
      refetch();
    }
  }, [page]);

  if (data?.data) {
    data.data = data.data.map((row, index) => ({
      ...row,
      key: data.id || index,
    }));
  }

  const handleUsersSelect = (option) => {
    setFilters({ ...filters, user: option });
  };
  const handleLogTypesSelect = (option) => {
    setFilters({ ...filters, logType: option });
  };

  return {
    data,
    page,
    setPage,
    isError,
    filters,
    isFetching,
    usersLoading,
    usersOptions,
    logTypeOptions,
    logTypesLoading,
    handleUsersSelect,
    handleLogTypesSelect,
  };
};

export default useLogsData;
