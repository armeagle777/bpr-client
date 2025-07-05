import { useState, useEffect } from "react";
import { Flex } from "antd";

import {
  DataTable,
  FiltersRowSkeleton,
} from "../../../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import { MOCK_COLUMNS } from "./ApastanTotal.constants";
import useFilterStatistics from "../../../../hooks/useFilterStatistics";
import {
  MOCK_MONTHS,
  MOCK_PERIODS,
  STATISTICS_TYPE_MAPS,
} from "../../../../utils/constants";
import useStatisticsPeriodsData from "../../../../hooks/useStatisticsPeriodsData";
import { addTotals } from "../../../../utils/helperFunctions";
import { useQueryClient } from "@tanstack/react-query";

const ApastanTotal = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["statistics-asylum"]);
    };
  }, [queryClient]);
  const {
    data: years,
    isLoading: isYearsLoading,
    isFetching: isYearsFetching,
    isError: isYearsError,
    error: yearsError,
  } = useStatisticsPeriodsData({ statisticsType: "ASYLUM" });

  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    filters,
    handleFilter,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "ASYLUM_TOTAL" });

  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.ASYLUM_TOTAL,
  };

  const dataWithTotals = addTotals(data);

  return (
    <Flex vertical>
      {isYearsFetching ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          filters={filters}
          years={years}
          periods={MOCK_PERIODS}
          months={MOCK_MONTHS}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      )}
      <DataTable
        filters={exportExcelFilters}
        isLoading={isFetching}
        modifiedData={dataWithTotals}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default ApastanTotal;
