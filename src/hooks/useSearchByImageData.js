import { useQuery } from '@tanstack/react-query';
import { searchPersonByImage } from '../api/personsApi';

const useSearchByImageData = (imageBase64) => {
  const { data, isLoading, isFetching, error, isError } = useQuery(
    ['search-by-image', imageBase64],
    () => searchPersonByImage(imageBase64),
    {
      keepPreviousData: false,
      enabled: !!imageBase64,
    }
  );
  return { data, isLoading, isFetching, error, isError };
};

export default useSearchByImageData;
