import useUsersData from "../../hooks/useUsersData";
import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Fade,
  Slide,
  useTheme,
  alpha,
  Container,
} from "@mui/material";
import { PersonAdd, People as PeopleIcon, FilterList as FilterIcon } from "@mui/icons-material";
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

  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Fade in timeout={600}>
            <Paper
              elevation={2}
              sx={{
                padding: 3,
                borderRadius: 3,
                height: "fit-content",
                position: "sticky",
                top: 20,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <FilterIcon color="primary" />
                <Typography variant="h6" component="h6" fontWeight="bold" color="primary">
                  Ֆիլտրեր
                </Typography>
              </Box>
              <TextField
                value={filters.search}
                id="filled-search"
                label="Որոնել"
                type="search"
                fullWidth
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  },
                }}
                onChange={(e) =>
                  setFilters((filters) => ({ ...filters, search: e.target.value }))
                }
              />
              <Typography variant="subtitle1" component="p" fontWeight="bold" sx={{ mb: 1 }}>
                Դերեր
              </Typography>
              <Grid container direction="column" spacing={1}>
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
            </Paper>
          </Fade>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              padding: "30px 10px",
            }}
          >
            <Fade in timeout={800}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon color="primary" />
                </Box>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  Օգտատերեր
                </Typography>
              </Box>
            </Fade>
            <Fade in timeout={1000}>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                sx={{
                  marginBottom: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
                onClick={onModalOpen}
              >
                Ավելացնել
              </Button>
            </Fade>
            <Slide direction="up" in timeout={1200}>
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
                    dataSource={filteredUsers}
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
    </Container>
  );
};

export default Users;
