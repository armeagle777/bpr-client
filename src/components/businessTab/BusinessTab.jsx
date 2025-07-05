import { Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import useFetchCompanies from '../../hooks/useFetchCompanies';
import ListScileton from '../listSceleton/ListScileton';
import BusinessCard from './BusinessCard';
import BusinessNotFound from './BusinessNotFound';

const BusinessTab = ({ ssn }) => {
    const { data, isLoading, isError, error } = useFetchCompanies(ssn);

    if (isLoading) {
        return <ListScileton />;
    }

    if (isError) {
        return <MuiAlert severity='error'>{error.message}</MuiAlert>;
    }
    const {
        companies,
        id_info,
        address,
        nationality_country_id,
        full_name,
        identification_no,
    } = { ...data };
    return (
        <Stack spacing={2} flexDirection='column' sx={{ py: 3, px: 1 }}>
            {data?.length === 0 ? (
                <BusinessNotFound />
            ) : (
                companies.map((company) => (
                    <BusinessCard key={company.reg_num} company={company} />
                ))
            )}
        </Stack>
    );
};

export default BusinessTab;
