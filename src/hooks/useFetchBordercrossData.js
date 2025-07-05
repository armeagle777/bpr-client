import { useQueries, useQuery } from "@tanstack/react-query";

import { getBordercrossDataBySsn } from "../api/personsApi";
import {
  filterUniqueDocuments,
  getFlattenData,
} from "../utils/helperFunctions";

const useFetchBordercrossData = (documents) => {
  const uniqueDocuments = filterUniqueDocuments(documents);
  const queries = useQueries({
    queries: uniqueDocuments.map((doc) => ({
      queryKey: ["bordercross-data", doc.Document_Number],
      queryFn: () =>
        getBordercrossDataBySsn({
          passportNumber: doc.Document_Number,
          citizenship:
            doc.Person?.Citizenship?.Citizenship[0]?.CountryShortName,
        }),
      enabled: !!doc.Document_Number, // Prevents unnecessary calls if no passport number
      keepPreviousData: true,
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const error = queries?.find((q) => q.error);
  const mergedData = queries
    ?.filter((query) => query.data && Object.keys(query.data).length)
    ?.map((query) => query.data)
    ?.reduce((acc, obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        acc[key] =
          acc[key] && Array.isArray(acc[key])
            ? [...acc[key], value]
            : acc[key]
            ? [acc[key], value]
            : [value];
      });
      return acc;
    }, {});

  const flattenData = getFlattenData(mergedData);

  return {
    isError,
    error,
    isLoading,
    data: flattenData,
  };
};

export default useFetchBordercrossData;
