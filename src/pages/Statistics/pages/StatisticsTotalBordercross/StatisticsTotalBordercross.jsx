import { useState, useEffect } from "react";
import { Flex } from "antd";

import { FilterRow } from "./FilterRow";
import {
  DataTable,
  FiltersRowSkeleton,
} from "../../../../statisticsComponents";
import { BORDERCROSS_TYPES, MOCK_COLUMNS } from "./constants";
import useFilterStatistics from "../../../../hooks/useFilterStatistics";
import {
  MOCK_MONTHS,
  MOCK_PERIODS,
  STATISTICS_TYPE_MAPS,
} from "../../../../utils/constants";
import useStatisticsPeriodsData from "../../../../hooks/useStatisticsPeriodsData";
import { addTotals } from "../../../../utils/helperFunctions";

const StatisticsTotalBordercross = () => {
  const {
    data: years,
    isLoading: isYearsLoading,
    isFetching: isYearsFetching,
    isError: isYearsError,
    error: yearsError,
  } = useStatisticsPeriodsData({ statisticsType: "BORDERCROSS" });

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
  } = useFilterStatistics({ statisticsType: "BORDERCROSS_TOTAL" });

  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.B_CROSS_TOTAL,
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
          types={BORDERCROSS_TYPES}
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
        modifiedData={dataWithTotals}
        isLoading={isFetching}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default StatisticsTotalBordercross;
