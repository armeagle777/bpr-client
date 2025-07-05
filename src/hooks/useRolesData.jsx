import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createRole,
  getPermissions,
  getRoles,
  updateRole,
  updateUser,
} from "../api/personsApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, message, Popconfirm, Select, Typography } from "antd";
import IosSwitch from "../components/IosSwitch/IosSwitch";

const useRolesData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const queryClient = useQueryClient();
  const [newRoleForm] = Form.useForm();
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const { isLoading, isError, error, data } = useQuery(
    ["roles"],
    () => getRoles(),
    {
      keepPreviousData: true,
    }
  );

  const {
    isLoading: isLoadingPermissions,
    isError: isErrorPermissions,
    data: permissions,
  } = useQuery(["permissions"], () => getPermissions(), {
    keepPreviousData: true,
  });

  const editRoleMutation = useMutation(
    ({ id, data }) => updateRole({ id, data }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("roles");
        toast.success("Հաջողությամբ խմբագրվել է", {
          progress: undefined,
        });
      },
      onError: (error, variables, context, mutation) => {
        toast.error(error.response?.data?.message || error.message, {
          progress: undefined,
        });
      },
    }
  );

  const createRoleMutation = useMutation((data) => createRole(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("roles");
      toast.success("Հաջողությամբ գրանցվել է", {
        progress: undefined,
      });
    },
    onError: (error, variables, context, mutation) => {
      toast.error(error.response?.data?.message || error.message, {
        progress: undefined,
      });
    },
  });

  const onFinish = (values) => {
    createRoleMutation.mutate(values);
    newRoleForm.resetFields();
    setIsModalOpen(false);
  };

  const modifiedRolesData = data?.roles?.map((role) => ({
    ...role,
    key: role.id.toString(),
  }));

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const index = modifiedRolesData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = modifiedRolesData[index];
        const newItem = { ...item, ...row };
        editRoleMutation.mutate({ id: item.id, data: newItem });
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleChange = (value) => {
    console.log("Value", value);
  };

  const permissionOptions = permissions?.permissions?.map((p) => ({
    label: p.name,
    value: p.id,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      editable: false,
    },
    {
      title: "Անուն",
      dataIndex: "name",
      editable: true,
      required: true,
    },
    {
      title: "Թույլտվություններ",
      dataIndex: "permissions",
      editable: true,
      required: true,
      options: { permissionOptions },
      render: (_, rec) => {
        const selectedOptions = rec.Permissions?.map((per) => ({
          label: per.name,
          value: per.id,
        }));

        return (
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "600px",
            }}
            placeholder="Թույլտվություն"
            onChange={handleChange}
            options={permissionOptions}
            value={selectedOptions}
            disabled={true}
            // getPopupContainer={(trigger) => trigger.parentNode}
          />
        );
      },
    },
    {
      title: "...",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Պահպանել
            </Typography.Link>
            <Popconfirm title="Համոզվա՞ծ եք" onConfirm={cancel}>
              <a>Չեղարկել</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Խմբագրել
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.options ? "select" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        required: col.required,
        editing: isEditing(record),
        ...(col.regex && { regex: col.regex }),
        ...(col.placeholder && { placeholder: col.placeholder }),
        ...(col.options && { options: col.options.permissionOptions }),
        ...(col.options && {
          defaultValue: record.Permissions?.map((per) => ({
            label: per.name,
            value: per.id,
          })),
        }),
      }),
    };
  });

  return {
    data: modifiedRolesData,
    error,
    isError,
    isLoading,
    editRoleMutation,
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
    permissions: permissionOptions,
  };
};

export default useRolesData;
