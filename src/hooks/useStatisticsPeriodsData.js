import { useEffect, useState } from "react";

import { getStatisticsPeriodsData } from "../api/personsApi";
import { useQuery } from "@tanstack/react-query";

const useStatisticsPeriodsData = ({ statisticsType }) => {
  const statisticsEndpoints = {
    ASYLUM: "asylum",
    BORDERCROSS: "sahmanahatum",
    WP: "wp",
  };
  const {
    data = [],
    isLoading,
    isFetching,
    isInitialLoading,
    isError,
    error,
  } = useQuery(
    ["statistics-periods", statisticsType],
    () => getStatisticsPeriodsData(statisticsEndpoints[statisticsType]),
    {
      keepPreviousData: false,
      enabled: true,
    }
  );

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    isInitialLoading,
  };
};

export default useStatisticsPeriodsData;
