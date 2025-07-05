import { Box } from '@mui/material';
import AddressTable from '../addressTable/AddressTable';
import PassportTable from '../passportTable/PassportTable';

const Documents = ({ documents, addresses }) => {
    return (
        <Box>
            <PassportTable documents={documents} />
            <AddressTable addresses={addresses} />
        </Box>
    );
};
export default Documents;
