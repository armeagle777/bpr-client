import { useQuery } from "@tanstack/react-query";
import { getRoadPoliceTransactions } from "../api/personsApi";

const useFetchRoadPoliceTransactions = (pnum) => {
  const { data, error, isError, isFetching } = useQuery(
    ["road-police-transactions", pnum],
    () => getRoadPoliceTransactions(pnum),
    { keepPreviousData: true }
  );
  return {
    data,
    error,
    isError,
    isFetching,
  };
};

export default useFetchRoadPoliceTransactions;
