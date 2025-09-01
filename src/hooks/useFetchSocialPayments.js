import { useQuery } from "@tanstack/react-query";

import { getSocialPayments } from "../api/personsApi";

const useFetchSocialPayments = (ssn) => {
  const { data, error, isError, isFetching } = useQuery(
    ["mlsa-social-payments", ssn],
    () => getSocialPayments(ssn),
    {
      keepPreviousData: false,
      cacheTime: 0,
    }
  );
  return { data, error, isError, isFetching };
};

export default useFetchSocialPayments;
