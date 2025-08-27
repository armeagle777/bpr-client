import { useQuery } from "@tanstack/react-query";
import { getTerritorialMinPropertyTaxes } from "../api/personsApi";

const useTerritorialMinPropertyTaxesData = (
  identificator,
  personType = "PHYSICAL",
  serviceType
) => {
  const { data, error, isError, isFetching } = useQuery(
    [
      "territorial-ministry-property-taxes",
      identificator,
      personType,
      serviceType,
    ],
    () => getTerritorialMinPropertyTaxes(pnum),
    { keepPreviousData: false, enabled: !!identificator && !!serviceType }
  );

  return {
    data,
    error,
    isError,
    isFetching,
  };
};

export default useTerritorialMinPropertyTaxesData;
