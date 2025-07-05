import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  checkEmail,
  createUser,
  getRoles,
  getUsers,
  toggleUserActive,
  updateUser,
  changePassword,
} from "../api/personsApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, message, Popconfirm, Select, Typography } from "antd";
import IosSwitch from "../components/IosSwitch/IosSwitch";

const useUsersData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const queryClient = useQueryClient();
  const [newUserForm] = Form.useForm();
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const {
    isLoading: isRolesLoading,
    isError: isRolesError,
    error: rolesError,
    data: roles,
  } = useQuery(["roles"], () => getRoles(), {
    keepPreviousData: true,
  });

  const { isLoading, isError, error, data } = useQuery(
    ["users"],
    () => getUsers(),
    {
      keepPreviousData: true,
    }
  );

  const editUserMutation = useMutation(
    ({ id, data }) => updateUser({ id, data }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("users");
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

  const changePwdMutation = useMutation(
    ({ id, data }) => changePassword({ id, data }),
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries("users");
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

  const toggleActiveMutation = useMutation(
    ({ id, data }) => toggleUserActive({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        message.success("Հաջողությամբ խմբագրվել է");
      },
      onError: (error, variables, context, mutation) => {
        message.error(error.response?.data?.message || error.message);
      },
    }
  );

  const createUserMutation = useMutation((data) => createUser(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
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

  const checkEmailInBackend = async (email) => {
    try {
      const response = await checkEmail(email);
      if (response.isValid) {
        return Promise.resolve();
      }
      return Promise.reject("Այս էլ. փոստն արդեն գրանցված է");
    } catch (error) {
      return Promise.reject("Սերվերի հետ կապի խնդիր");
    }
  };

  const rolesOptions = roles?.roles?.map((p) => ({
    label: p.name,
    value: p.id,
  }));

  const onFinish = (values) => {
    createUserMutation.mutate(values);
    newUserForm.resetFields();
    setIsModalOpen(false);
  };

  const modifiedUsersData = data?.users?.map((user) => ({
    ...user,
    password: "",
    key: user.id.toString(),
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
      const index = modifiedUsersData.findIndex((item) => key == item.key);

      if (index > -1) {
        const item = modifiedUsersData[index];
        const newItem = { ...item, ...row };
        editUserMutation.mutate({ id: item.id, data: newItem });
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onToggle = ({ id, data }) => {
    toggleActiveMutation.mutate({ id, data });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleChange = (val) => {
    console.log("Val", val);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      editable: false,
    },
    {
      title: "Անուն",
      dataIndex: "firstName",
      editable: true,
      required: true,
    },
    {
      title: "Ազգանուն",
      dataIndex: "lastName",
      editable: true,
      required: true,
    },
    {
      title: "Էլ. փոստ",
      dataIndex: "email",
      editable: true,
      required: true,
    },
    {
      title: "Պաշտոն",
      dataIndex: "pashton",
      editable: true,
      required: true,
    },
    {
      title: "Հեռ.",
      dataIndex: "phoneNumber",
      editable: true,
      regex: /^0\d{8}$/,
      placeholder: "0xxaabbcc",
    },
    {
      title: "Գաղտնաբառ",
      dataIndex: "password",
      editable: true,
    },
    {
      title: "Դեր",
      dataIndex: "RoleId",
      editable: true,
      required: true,
      options: { rolesOptions },
      render: (_, rec) => {
        return (
          <Select
            allowClear
            placeholder="Դեր"
            onChange={handleChange}
            options={rolesOptions}
            defaultValue={[rec.RoleId]}
            style={{ width: "150px" }}
            disabled={true}
          />
        );
      },
    },
    {
      title: "Կարգավիճակ",
      dataIndex: "isActivated",
      editable: false,
      render: (_, record) => {
        return (
          <IosSwitch
            defaultChecked={record.isActivated}
            onChange={() => onToggle({ id: record.id, data: record })}
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
        ...(col.options && { options: col.options.rolesOptions }),
        ...(col.options && {
          defaultValue: [record.RoleId],
        }),
      }),
    };
  });

  return {
    data: modifiedUsersData,
    error,
    isError,
    isLoading,
    editUserMutation,
    createUserMutation,
    mergedColumns,
    onModalClose,
    onModalOpen,
    cancel,
    onFinish,
    checkEmailInBackend,
    isModalOpen,
    newUserForm,
    form,
    isRolesLoading,
    rolesOptions,
    changePwdMutation,
  };
};

export default useUsersData;
