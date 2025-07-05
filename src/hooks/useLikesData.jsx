import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { getLikes, toggleLike } from "../api/personsApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Form, Popconfirm, Typography, message } from "antd";
import { formatDate } from "../components/pdf-templates/templates.helpers";

const useLikesData = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { isLoading, isError, error, data } = useQuery(
    ["likes"],
    () => getLikes(),
    {
      keepPreviousData: true,
    }
  );

  const toggleLikeMutation = useMutation(
    ({ uid, text }) => toggleLike({ uid, text }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("likes");
        message.success("Հաջողությամբ կատարվել է");
      },
      onError: (error, variables, context, mutation) => {
        message.error("Ինչ-որ բան այնպես չէ");
      },
    }
  );

  const modifiedLikesData = data?.likes?.map((likeRow) => ({
    ...likeRow,
    key: likeRow.id.toString(),
  }));

  const cancel = (e) => {
    console.log(":>");
  };
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
            title="Հեռացնել պահպանված որոնման տողը"
            description="Համոզվա՞ծ եք"
            onConfirm={() => onLikeToggle({ uid: record.uid })}
            onCancel={cancel}
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

  const onLikeToggle = ({ uid, text }) => {
    toggleLikeMutation.mutate({ uid, text });
  };

  return {
    onLikeToggle,
    isLoading,
    isError,
    error,
    data: modifiedLikesData,
    columns,
    cancel,
  };
};

export default useLikesData;
