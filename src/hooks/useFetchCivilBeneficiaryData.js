import { useQuery } from "@tanstack/react-query";
import { getCivilBeneficiaryData } from "../api/personsApi";

const useFetchCivilBeneficiaryData = (pnum) => {
  const { data, error, isError, isFetching } = useQuery(
    ["moj-civil-beneficiary", pnum],
    () => getCivilBeneficiaryData(pnum),
    { keepPreviousData: true }
  );
  return {
    data,
    error,
    isError,
    isFetching,
  };
};

export default useFetchCivilBeneficiaryData;
