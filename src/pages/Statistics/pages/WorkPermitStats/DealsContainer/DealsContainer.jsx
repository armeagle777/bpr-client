import { useEffect, useState } from "react";
import { Flex } from "antd";

import { FilterRow } from "../FilterRow";
import { FiltersRowSkeleton } from "../../../../../statisticsComponents";
import useStatisticsPeriodsData from "../../../../../hooks/useStatisticsPeriodsData";

const DealsContainer = ({
  children,
  title,
  filters,
  onFilter,
  isDataLoading,
  onFilterChange,
  onResetFilters,
}) => {
  const {
    data: years,
    isLoading: isYearsLoading,
    isFetching: isYearsFetching,
    isError: isYearsError,
    error: yearsError,
  } = useStatisticsPeriodsData({ statisticsType: "WP" });

  return (
    <Flex vertical>
      <p
        style={{
          fontStyle: "italic",
          color: "#314056",
          fontWeight: "bold",
          fontSize: "1.05em",
          marginBottom: 5,
        }}
      >
        {title}
      </p>
      {isYearsFetching ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          years={years}
          filters={filters}
          onFilter={onFilter}
          isDataLoading={isDataLoading}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
        />
      )}
      {children}
    </Flex>
  );
};

export default DealsContainer;
