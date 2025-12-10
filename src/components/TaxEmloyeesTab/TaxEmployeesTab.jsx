import { useMemo, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Alert, Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PictureAsPdf as PictureAsPdfIcon } from '@mui/icons-material';

import NoResults from '../NoResults/NoResults';
import DataLoader from '../DataLoader/DataLoader';
import EmployeeList from './components/EmployeeList';
import useFetchCompanyEmployees from '../../hooks/useFetchCompanyEmployees';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import TaxEmployeesReport from '../pdf-templates/TaxEmployeesReport';

const filterLabelsMap = {
  all: 'Բոլորը',
  active: 'Ակտիվ',
  nonActive: 'Ոչ ակտիվ',
};

const TaxEmloyeesTab = ({ taxId }) => {
  const [filter, setFilter] = useState('all');
  const { data, isError, error, isFetching } = useFetchCompanyEmployees({
    taxId,
  });
  const user = useAuthUser();

  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredEmployees = useMemo(() => {
    if (!data) return [];
    return data.filter((emp) => {
      if (filter === 'active') return emp.isActiveEmployee;
      if (filter === 'nonActive') return !emp.isActiveEmployee;
      return true;
    });
  }, [data, filter]);

  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const exportFileName = useMemo(() => {
    const safeTaxId = typeof taxId === 'string' ? taxId.replace(/[^\w-]/g, '_') : 'report';
    return `company_employees_${safeTaxId || 'report'}.pdf`;
  }, [taxId]);

  const pdfData = useMemo(() => {
    if (!filteredEmployees?.length) {
      return null;
    }
    return {
      employees: filteredEmployees,
      taxId,
      filterLabel: filterLabelsMap[filter] || filterLabelsMap.all,
    };
  }, [filteredEmployees, taxId, filter]);

  const exportButton =
    !isFetching && pdfData ? (
      <PDFGenerator
        PDFTemplate={TaxEmployeesReport}
        fileName={exportFileName}
        buttonText="Արտահանել"
        variant="outlined"
        Icon={PictureAsPdfIcon}
        data={pdfData}
        userFullName={userFullName}
      />
    ) : null;

  if (isError) {
    return <Alert severity="error">{error?.message || 'Սխալ է տեղի ունեցել:'}</Alert>;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h5" color="primary" fontWeight="bold">
          Կազմակերպության Աշխատակիցների Վերաբերյալ Տեղեկատվություն
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            size="small"
            color="primary"
          >
            <ToggleButton value="all">Բոլորը</ToggleButton>
            <ToggleButton value="active">Ակտիվ</ToggleButton>
            <ToggleButton value="nonActive">Ոչ Ակտիվ</ToggleButton>
          </ToggleButtonGroup>
          {exportButton}
        </Stack>
      </Box>

      {isFetching ? (
        <DataLoader />
      ) : data === null ? (
        <NoResults />
      ) : (
        <EmployeeList employees={filteredEmployees} />
      )}
    </>
  );
};

export default TaxEmloyeesTab;
