import { useQuery } from "@tanstack/react-query";
import { getCountriesData } from "../api/personsApi";

const useCountriesData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wp-countries"],
    queryFn: getCountriesData,
  });

  const countriesOptions =
    data?.map((country) => ({
      value: country.id,
      label: country.name_am,
    })) || [];

  return { countriesOptions };
};

export default useCountriesData;
