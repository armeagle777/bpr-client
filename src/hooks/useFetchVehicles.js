import { useQuery } from "@tanstack/react-query";

import { getVehiclesByParams } from "../api/personsApi";

const useFetchVehicles = ({ q, searchBase }) => {
  const { isFetching, isLoading, isError, error, data } = useQuery(
    ["vehicle-search", q, searchBase],
    () => getVehiclesByParams(q, searchBase),
    {
      keepPreviousData: true,
      enabled: !!q,
    }
  );

  return {
    error,
    isError,
    isFetching,
    isLoading,
    data,
  };
};

export default useFetchVehicles;
