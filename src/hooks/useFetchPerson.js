import { useQuery } from '@tanstack/react-query';

import { getPersonBySsn } from '../api/personsApi';

const useFetchPerson = (ssn) => {
    const { isLoading, isError, error, data } = useQuery(
        ['persons', ssn],
        () => getPersonBySsn(ssn),
        {
            keepPreviousData: false,
        }
    );

    return {
        error,
        isError,
        isLoading,
        data,
    };
};

export default useFetchPerson;
