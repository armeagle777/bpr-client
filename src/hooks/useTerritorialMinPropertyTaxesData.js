import { useQuery } from "@tanstack/react-query";
import { getTerritorialMinPropertyTaxes } from "../api/personsApi";

const useTerritorialMinPropertyTaxesData = ({
  identificator,
  personType = "PHYSICAL",
  serviceType,
}) => {
  const { data, error, isError, isFetching } = useQuery(
    [
      "territorial-ministry-property-taxes",
      identificator,
      personType,
      serviceType,
    ],
    () =>
      getTerritorialMinPropertyTaxes({
        identificator,
        personType,
        serviceType,
      }),
    {
      keepPreviousData: true,
      enabled: !!identificator && !!serviceType,
    }
  );

  return {
    data,
    error,
    isError,
    isFetching,
  };
};

export default useTerritorialMinPropertyTaxesData;
