import { useQuery } from "@tanstack/react-query";
import { getCivilCases } from "../api/personsApi";

const useFetchMojCivilCases = (pnum) => {
  const { data, error, isError, isFetching } = useQuery(
    ["moj-civil-cases", pnum],
    () => getCivilCases(pnum),
    { keepPreviousData: true }
  );
  return {
    data,
    error,
    isError,
    isFetching,
  };
};

export default useFetchMojCivilCases;
