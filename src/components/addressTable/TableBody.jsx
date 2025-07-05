import MuiTableBody from '@mui/material/TableBody';

import TableRow from './TableRow';

const TableBody = ({ rows }) => {
    return (
        <MuiTableBody>
            {rows.map((row, index) => (
                <TableRow key={index} rowInfo={row} />
            ))}
        </MuiTableBody>
    );
};

export default TableBody;
