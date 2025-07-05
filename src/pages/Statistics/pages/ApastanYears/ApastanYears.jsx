import { Flex } from "antd";

import { DataTable } from "../../../../statisticsComponents";

import { MOCK_COLUMNS } from "./ApastanYears.constants";
import useFilterStatistics from "../../../../hooks/useFilterStatistics";
import { useEffect } from "react";
import { STATISTICS_TYPE_MAPS } from "../../../../utils/constants";
import { addTotals } from "../../../../utils/helperFunctions";
import { useQueryClient } from "@tanstack/react-query";

const ApastanYears = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["statistics-asylum"]);
    };
  }, [queryClient]);
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    handleFilter,
    refetch,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "ASYLUM_YEARS" });

  const exportExcelFilters = {
    statisticsType: STATISTICS_TYPE_MAPS.ASYLUM_YEARS,
  };

  useEffect(() => {
    refetch();
  }, []);
  const dataWithTotals = addTotals(data);
  return (
    <Flex vertical>
      <DataTable
        filters={exportExcelFilters}
        isLoading={isFetching}
        modifiedData={dataWithTotals}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default ApastanYears;
