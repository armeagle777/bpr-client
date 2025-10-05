import { Skeleton, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import useFetchCompany from '../../../hooks/useFetchCompany';
import { formatedData } from '../../../utils/helperFunctions';
// import CompanyTooltip from "./CompanyTooltip";
import StyledTableRow from './StyledTableRow';
import TableHeader from './TableHeader';

const FinanceTable = ({ employer }) => {
  const {
    taxpayerid,
    taxpayerName,
    legalTypeName,
    personInfoPeriods: { personInfoPeriod: periods },
  } = employer;

  const TableData = formatedData(periods);
  const shouldFetchCompanyData = !taxpayerName;

  const {
    data: companyData,
    isFetching,
    isError,
    error,
  } = useFetchCompany(taxpayerid, shouldFetchCompanyData);

  const tableTitle = isFetching ? (
    <Skeleton />
  ) : isError ? (
    taxpayerid
  ) : (
    <TableHeader
      legalTypeName={legalTypeName}
      taxpayerName={taxpayerName}
      taxpayerid={taxpayerid}
      companyData={companyData}
    />
  );

  return (
    <Stack spacing={1} sx={{ mb: 3 }}>
      {tableTitle}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size="small" aria-label="sallery table">
          <TableHead>
            <MuiTableRow>{TableData.titles}</MuiTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>{TableData.salaryEquivPayments}</StyledTableRow>
            <StyledTableRow>{TableData.civilLowContractPayments}</StyledTableRow>
            <StyledTableRow>{TableData.incomeTax}</StyledTableRow>
            <StyledTableRow>{TableData.socialpayments}</StyledTableRow>
            <StyledTableRow>{TableData.socialpaymentspaid}</StyledTableRow>
            <StyledTableRow>{TableData.workinghours}</StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default FinanceTable;
