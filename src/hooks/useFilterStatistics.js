import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getStatisticsData } from "../api/personsApi";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const useFilterStatistics = ({ statisticsType }) => {
  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const initialFilters = {
    year: "",
    period: "",
    month: "",
    decType: "",
    claim_type: "",
    report_type: "",
    wp_type: "",
    borderCross: "",
  };
  // const initialFilters = {
  //   year: queryParams.get("year") || "",
  //   period: queryParams.get("period") || "",
  //   month: queryParams.get("month") || "",
  //   decType: queryParams.get("decType") || "",
  // };
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.year) params.set("year", filters.year);
    if (filters.period) params.set("period", filters.period);
    if (filters.month) params.set("month", filters.month);
    if (filters.decType) params.set("decType", filters.decType);
    if (filters.claim_type) params.set("claim_type", filters.claim_type);
    if (filters.report_type) params.set("report_type", filters.report_type);
    if (filters.wp_type) params.set("wp_type", filters.wp_type);
    if (filters.borderCross) params.set("borderCross", filters.borderCross);

    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);

  const handleFilterChange = (e) => {
    const { name, value } = e;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const statisticsEndpoints = {
    ASYLUM_TOTAL: "/asylum/total",
    ASYLUM_APPLICATIONS: "/asylum/applications",
    ASYLUM_DECISIONS: "/asylum/decisions",
    ASYLUM_YEARS: "/asylum/years",
    BORDERCROSS_TOTAL: "/sahmanahatum/total",
    BORDERCROSS_COUNTRIES: "/sahmanahatum/countries",
    BORDERCROSS_PERIODS: "/sahmanahatum/periods",
    WP_SIMPLE: "/wp/simple",
  };

  const {
    data = [],
    isLoading,
    isFetching,
    isInitialLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    ["statistics-asylum", filters],
    () => getStatisticsData(filters, statisticsEndpoints[statisticsType]),
    {
      keepPreviousData: false,
      enabled: false,
    }
  );

  const handleFilter = useCallback(() => refetch(), [refetch]);

  const handleResetFilters = () => {
    setFilters({ ...initialFilters });
  };

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    handleFilter,
    refetch,
    filters,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  };
};

export default useFilterStatistics;
