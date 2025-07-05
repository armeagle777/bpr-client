import { Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import QkagDocument from '../qkagDocument/QkagDocument';

import useFetchQkag from '../../hooks/useFetchQkag';
import DocumentNotFound from './DocumentNotFound';
import ListScileton from '../listSceleton/ListScileton';

const Family = ({ ssn, firstName, lastName }) => {
    const {
        data: documents,
        isLoading,
        isError,
        error,
    } = useFetchQkag(ssn, firstName, lastName);

    if (isLoading) {
        return <ListScileton />;
    }

    if (isError) {
        return <MuiAlert severity='error'>{error.message}</MuiAlert>;
    }

    return (
        <Box sx={{ pt: 3 }}>
            {documents?.length === 0 ? (
                <DocumentNotFound />
            ) : (
                documents.map((doc) => (
                    <QkagDocument
                        key={doc.tracking_id}
                        targetSsn={ssn}
                        document={doc}
                    />
                ))
            )}
        </Box>
    );
};

export default Family;
