import useUsersData from "../../hooks/useUsersData";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import EditableCell from "./EditableCell/EditableCell";

import { Form, Table } from "antd";
import Modal from "../../components/Modal/Modal";
import NewUserForm from "./NewUserForm/NewUserForm";
import ModalHeader from "./ModalHeader/ModalHeader";
import CheckboxButton from "../../components/CheckboxButton/CheckboxButton";
import { useState } from "react";

const Users = () => {
  const {
    data: usersData,
    error,
    form,
    rolesOptions,
    cancel,
    isError,
    onFinish,
    isLoading,
    isModalOpen,
    onModalOpen,
    newUserForm,
    onModalClose,
    mergedColumns,
    isRolesLoading,
    editUserMutation,
    createUserMutation,
    checkEmailInBackend,
  } = useUsersData();

  const initialFilters = {
    search: "",
    roles: [],
  };

  const [filters, setFilters] = useState(initialFilters);

  if (isError) return <Alert severity="error">{error}</Alert>;

  const usersWithKey = usersData?.map((user) => ({
    ...user,
    key: user.id,
  }));

  const filteredUsers = usersWithKey?.filter((user) => {
    const searchMatch = filters.search
      ? user.email.includes(filters.search) ||
        user.firstName.includes(filters.search) ||
        user.lastName.includes(filters.search)
      : true;

    // Check roles filter
    const roleMatch =
      filters.roles.length > 0 ? filters.roles.includes(user.Role.name) : true;

    return searchMatch && roleMatch;
  });

  const handleRoleFilter = (roleName) => {
    if (!roleName) return;
    if (Array.isArray(roleName)) {
      return setFilters((filters) => ({
        ...filters,
        roles: roleName,
      }));
    }
    const roles = filters.roles;

    const newRols = roles.includes(roleName)
      ? roles.filter((direction) => direction !== roleName)
      : [...roles, roleName];

    setFilters((filters) => ({ ...filters, roles: newRols }));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={2} sx={{ borderRight: "1px solid #999" }}>
        <Box
          sx={{
            padding: "30px 5px",
          }}
        >
          <Typography variant="h6" component="h6" align="center" mb={2}>
            Ֆիլտրեր
          </Typography>
          <TextField
            value={filters.search}
            id="filled-search"
            label="Որոնել"
            type="search"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) =>
              setFilters((filters) => ({ ...filters, search: e.target.value }))
            }
          />
          <Typography variant="p" component="p">
            Դերեր
          </Typography>
          <Grid container direction="column" spacing={1} sx={{ mt: "2px" }}>
            {rolesOptions?.length &&
              rolesOptions.map((role) => (
                <Grid item key={role.value}>
                  <CheckboxButton
                    text={role.label}
                    onRoleFilter={handleRoleFilter}
                    checked={filters.roles.includes(role.label)}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box
          sx={{
            padding: "30px 10px",
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
              dataSource={filteredUsers}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>

          <Modal isOpen={isModalOpen} onClose={onModalClose}>
            <ModalHeader />
            <NewUserForm
              form={newUserForm}
              onFinish={onFinish}
              checkEmailInBackend={checkEmailInBackend}
              onCancel={onModalClose}
              rolesOptions={rolesOptions}
              isLoading={createUserMutation.isLoading}
            />
          </Modal>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Users;
