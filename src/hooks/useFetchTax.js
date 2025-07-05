import { useQuery } from '@tanstack/react-query';

import { getTaxBySsn } from '../api/personsApi';

const useFetchTax = (ssn, page) => {
    const { isLoading, isFetching, isError, error, data } = useQuery(
        ['tax', page, ssn],
        () => getTaxBySsn(ssn),
        {
            keepPreviousData: true,
        }
    );

    return {
        error,
        isError,
        isLoading,
        data,
    };
};

export default useFetchTax;
