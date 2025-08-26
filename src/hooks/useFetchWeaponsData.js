import { useQuery } from "@tanstack/react-query";

import { getWeaponsData } from "../api/personsApi";

const useFetchWeaponsData = (params) => {
  const [certNumberInput, setCertNumberInput] = useState("");

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["weapons", params],
    () => getWeaponsData(params),
    {
      keepPreviousData: false,
      cacheTime: 0,
    }
  );

  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !certNumberInput) return;

    setCertificatesSearchParams({ q: q ?? certNumberInput, searchBase });
  };

  return {
    error,
    isError,
    isLoading,
    isFetching,
    data,
    certNumberInput,
    handleSubmitSearch,
    setCertNumberInput,
  };
};

export default useFetchWeaponsData;
