import { Alert, Box, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
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

  if (isError) return <Alert severity="error">{error.message || 'Փորձեք ավելի ուշ'}</Alert>;

  return (
    <Box
      sx={{
        padding: '30px 10px',
      }}
    >
      <Button
        variant="outlined"
        startIcon={<PersonAdd />}
        sx={{ marginBottom: 2 }}
        onClick={onModalOpen}
      >
        Ավելացնել
      </Button>
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
  );
};

export default Roles;
