import { useQuery } from '@tanstack/react-query';

import { getCompanyByHvhh } from '../api/personsApi';

const useFetchCompany = (tax_id, page) => {
    const { isFetching, isError, error, data } = useQuery(
        ['company', page, tax_id],
        () => getCompanyByHvhh(tax_id),
        {
            keepPreviousData: true,
        }
    );

    return {
        error,
        isError,
        isFetching,
        data,
    };
};

export default useFetchCompany;
