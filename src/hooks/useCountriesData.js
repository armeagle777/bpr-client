import { useQuery } from "@tanstack/react-query";
import { getAsylumCountriesData, getCountriesData } from "../api/personsApi";

const useCountriesData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wp-countries"],
    queryFn: getCountriesData,
  });

  const {
    data: asylumCountries,
    isLoading: asylumCountriesLoading,
    isError: asylumCountriesIsError,
    error: asylumCountriesError,
  } = useQuery({
    queryKey: ["asylum-countries"],
    queryFn: getAsylumCountriesData,
  });

  const countriesOptions =
    data?.map((country) => ({
      value: country.id,
      label: country.name_am,
    })) || [];

  const asylumCountriesOptions =
    asylumCountries?.map((c) => ({
      value: c.country_id,
      label: c.country_arm,
    })) || [];

  return { countriesOptions, asylumCountriesOptions };
};

export default useCountriesData;
