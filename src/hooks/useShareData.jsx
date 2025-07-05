import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getLightUsers,
  getShares,
  removeShare,
  shareInfo,
} from "../api/personsApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Form, Popconfirm, Typography, message } from "antd";
import { useState } from "react";
import { formatDate } from "../components/pdf-templates/templates.helpers";

const useShareData = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const queryClient = useQueryClient();
  const [shareForm] = Form.useForm();

  const { isLoading, isError, error, data } = useQuery(
    ["shares"],
    () => getShares(),
    {
      keepPreviousData: true,
    }
  );

  const { isLoading: getUsersLodaing, data: usersData } = useQuery(
    ["users-light"],
    () => getLightUsers(),
    {
      keepPreviousData: true,
    }
  );

  const submitShareMutation = useMutation((data) => shareInfo(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("shares");
      shareForm.resetFields();
      setDrawerOpen(false);
      message.success("Հաջողությամբ կատարվել է");
    },
    onError: (error, variables, context, mutation) => {
      message.error("Ինչ-որ բան այնպես չէ");
    },
  });

  const removeShareMutation = useMutation(
    ({ id, data }) => removeShare({ id, data }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("shares");
        message.success("Հաջողությամբ կատարվել է");
      },
      onError: (error, variables, context, mutation) => {
        message.error("Ինչ-որ բան այնպես չէ");
      },
    }
  );

  const onRemoveShare = ({ id, data }) => {
    removeShareMutation.mutate({ id, data });
  };

  const modifiedSharesData = data?.shares?.map((shareRow) => ({
    ...shareRow,
    key: shareRow.id.toString(),
  }));

  const usersOptions = usersData?.users?.map((user) => ({
    label: `${user.firstName[0]}. ${user.lastName}`,
    value: user.id,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "ՀԾՀ / ՀՎՀՀ",
      dataIndex: "uid",
      render: (_, record) => {
        const { uid } = record;
        const destinationUrl =
          uid.length === 10 ? `/bpr/${uid}` : `/register/${uid}`;
        return <Link to={destinationUrl}>{uid}</Link>;
      },
    },
    {
      title: "Տվյալներ",
      dataIndex: "text",
    },
    {
      title: "Մեկնաբանություն",
      dataIndex: "comment",
    },
    {
      title: "Ումից",
      dataIndex: "Sender",
      render: (_, record) => {
        return record.Sender.firstName + " " + record.Sender.lastName;
      },
    },
    {
      title: "Ստեղծման ա/թ",
      dataIndex: "createdAt",
      render: (_, record) => formatDate(new Date(record.createdAt)),
    },
    {
      title: "...",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Հեռացնել տվյալ տողը"
            description="Համոզվա՞ծ եք"
            onConfirm={() => onRemoveShare({ id: record.id, data: record })}
            onCancel={onCancel}
            okText="Հեռացնել"
            cancelText="Չեղարկել"
            placement="left"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      },
    },
  ];

  const onShareSubmit = (values) => {
    submitShareMutation.mutate(values);
  };

  const onCancel = () => console.log("canceled");

  return {
    sharesData: modifiedSharesData,
    onShareSubmit,
    shareForm,
    isLoading,
    isError,
    error,
    getUsersLodaing,
    usersOptions,
    drawerOpen,
    setDrawerOpen,
    onCancel,
    columns,
  };
};

export default useShareData;
