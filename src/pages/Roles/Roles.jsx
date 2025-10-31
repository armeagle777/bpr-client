import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  Slide,
  Paper,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { PersonAdd, Security as SecurityIcon } from '@mui/icons-material';
import EditableCell from './EditableCell/EditableCell';

import { Form, Table } from 'antd';
import Modal from '../../components/Modal/Modal';
import NewRoleForm from './NewRoleForm/NewRoleForm';
import ModalHeader from './ModalHeader/ModalHeader';
import useRolesData from '../../hooks/useRolesData';

const Roles = () => {
  const {
    data: rolesData,
    error,
    isError,
    isLoading,
    createRoleMutation,
    mergedColumns,
    onModalClose,
    onModalOpen,
    cancel,
    onFinish,
    isModalOpen,
    newRoleForm,
    form,
    isLoadingPermissions,
    permissions,
  } = useRolesData();

  const theme = useTheme();

  if (isError)
    return (
      <Fade in timeout={300}>
        <Alert severity="error">{error.message || 'Փորձեք ավելի ուշ'}</Alert>
      </Fade>
    );

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          padding: '30px 10px',
        }}
      >
        <Fade in timeout={600}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SecurityIcon color="primary" />
            </Box>
            <Typography variant="h5" fontWeight="bold" color="primary">
              Դերեր
            </Typography>
          </Box>
        </Fade>
        <Fade in timeout={800}>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            sx={{
              marginBottom: 3,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              },
            }}
            onClick={onModalOpen}
          >
            Ավելացնել
          </Button>
        </Fade>
        <Slide direction="up" in timeout={1000}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={rolesData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </Paper>
        </Slide>

        <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <ModalHeader />
          <NewRoleForm
            form={newRoleForm}
            onFinish={onFinish}
            onCancel={onModalClose}
            isLoading={createRoleMutation.isLoading}
            permissions={permissions}
          />
        </Modal>
      </Box>
    </Container>
  );
};

export default Roles;
