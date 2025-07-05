import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MuiTableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';


const TableRow = ({ rowInfo }) => {

    const {
        RegistrationAddress: {
            Street,
            Residence,
            Region,
            Postal_Index,
            Community,
            Apartment,
            Building,
            Building_Type,
            Foreign_Country,
            Foreign_Region,
            Foreign_Community,
            Foreign_Address,
        },
        RegistrationData: {
            Registration_Aim ,
            Registered_Date,
            Registration_Department,
            Registration_Date,
            Registration_Type,
            Temporary_Registration_Date,
        },
    } = rowInfo;

    let addressString;
    if (!Foreign_Country) {
        addressString = `${
            Region === Community ? Region : Region + ' ' + Community
        }, ${Residence || ''}, ${Street || ''}  ${
            (Building_Type || '', Building || '')
        }, ${Apartment || ''}`;
    } else {
        addressString = `${Foreign_Country.CountryName || ''}, ${
            Foreign_Region || ''
        }, ${Foreign_Community || ''}, ${Foreign_Address || ''}`;
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(MuiTableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <Tooltip
            title={Registration_Type === 'CURRENT' ? 'Ակտուալ' : 'Հին'}
            placement='left'
        >
            <StyledTableRow>
                <StyledTableCell component='th' scope='row'>
                    {addressString}
                    {Postal_Index && `, Փ/Ի:${Postal_Index}`}
                </StyledTableCell>
                <StyledTableCell align='right'>{Registration_Aim?.AimName}</StyledTableCell>
                <StyledTableCell align='right'>
                    {Registration_Department}
                </StyledTableCell>
                <StyledTableCell align='right'>
                    {Registration_Date ||
                        Temporary_Registration_Date ||
                        '- - -'}
                </StyledTableCell>
                <StyledTableCell align='right'>
                    {Registered_Date || '- - -'}
                </StyledTableCell>
            </StyledTableRow>
        </Tooltip>
    );
};

export default TableRow;
