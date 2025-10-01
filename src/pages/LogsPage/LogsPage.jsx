import { useState } from 'react';
import { Box, Stack, Container, Pagination } from '@mui/material';

import LogsList from './components/LogsList';
import LogsTable from './components/LogsTable';
import PageHeader from './components/PageHeader';
import FiltersRow from './components/FiltersRow';
import useLogsData from '../../hooks/useLogsData';
import DataLoader from '../../components/DataLoader/DataLoader';

const LogsPage = () => {
  const [view, setView] = useState('cards'); // cards or table

  const {
    page,
    data,
    setPage,
    filters,
    isError,
    isFetching,
    usersOptions,
    usersLoading,
    logTypeOptions,
    logTypesLoading,
    handleUsersSelect,
    handleLogTypesSelect,
  } = useLogsData();

  const logs = data?.data;
  const pagination = data?.pagination;

  const handleViewChange = (_, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  return (
    <Container>
      <Box sx={{ p: 3 }}>
        <PageHeader view={view} onViewChange={handleViewChange} />
        <FiltersRow
          filters={filters}
          usersLoading={usersLoading}
          usersOptions={usersOptions}
          logTypeOptions={logTypeOptions}
          logTypesLoading={logTypesLoading}
          onUsersSelect={handleUsersSelect}
          onLogTypesSelect={handleLogTypesSelect}
        />

        {isFetching && <DataLoader />}
        {!logs && null}
        {logs && view === 'cards' && <LogsList logs={logs} />}
        {logs && view === 'table' && <LogsTable logs={logs} />}

        {logs && pagination && (
          <Stack spacing={2} alignItems="center" mt={3}>
            <Pagination
              count={pagination?.totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default LogsPage;
