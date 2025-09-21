import { useQuery } from "@tanstack/react-query";
import { getRoadPoliceViolations } from "../api/personsApi";

const useFetchRoadPoliceViolations = (pnum) => {
  const { data, error, isError, isFetching } = useQuery(
    ["road-police-violations", pnum],
    () => getRoadPoliceViolations(pnum),
    { keepPreviousData: true }
  );
  return {
    data,
    error,
    isError,
    isFetching,
  };
};

export default useFetchRoadPoliceViolations;
