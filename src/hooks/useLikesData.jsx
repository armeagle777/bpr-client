import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { createLike, deleteLike, getLikes, toggleLike } from '../api/personsApi';
import { formatDate } from '../components/pdf-templates/templates.helpers';
import { formatFieldsLabel } from '../components/SavedSearchTag/SavedSearchTag.helpers';
import { useState } from 'react';

const useLikesData = ({ likeTypeName, pageSize } = {}) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['likes', likeTypeName, pageSize, page],
    () => getLikes({ likeTypeName, pageSize, page }),
    {
      keepPreviousData: true,
    }
  );

  const toggleLikeMutation = useMutation(({ uid, text }) => toggleLike({ uid, text }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('likes');
      message.success('Հաջողությամբ կատարվել է');
    },
    onError: (error, variables, context, mutation) => {
      message.error('Ինչ-որ բան այնպես չէ');
    },
  });

  const deleteLikeMutation = useMutation((id) => deleteLike(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('likes');
      message.success('Հաջողությամբ Հեռացվել է');
    },
    onError: (error, variables, context, mutation) => {
      message.error('Ինչ-որ բան այնպես չէ');
    },
  });

  const createLikeMutation = useMutation(
    ({ fields, likeTypeName }) => createLike({ fields, likeTypeName }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('likes');
        message.success('Հաջողությամբ կատարվել է');
      },
      onError: (error, variables, context, mutation) => {
        message.error('Ինչ-որ բան այնպես չէ');
      },
    }
  );

  const modifiedLikesData = data?.data?.map((likeRow) => ({
    ...likeRow,
    key: likeRow.id.toString(),
  }));

  const cancel = (e) => {
    console.log(':>');
  };
  const columns = [
    {
      title: 'Որոնման Պարամետրեր',
      dataIndex: 'fields',
      render: (_, record) => {
        const label = formatFieldsLabel(record.fields);
        const destinationUrl = `/bpr/`;
        return <Link to={destinationUrl}>{label}</Link>;
      },
    },
    {
      title: 'Որոնման Տեսակը',
      dataIndex: 'LikeType',
      render: (_, record) => {
        return record.LikeType.name;
      },
    },
    {
      title: 'Ստեղծման ա/թ',
      dataIndex: 'createdAt',
      render: (_, record) => formatDate(new Date(record.createdAt)),
    },
    {
      title: '...',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Popconfirm
            title="Հեռացնել պահպանված որոնման տողը"
            description="Համոզվա՞ծ եք"
            onConfirm={() => deleteLikeMutation.mutate(record.id)}
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

  const onLikeCreate = ({ fields, likeTypeName }) => {
    createLikeMutation.mutate({ fields, likeTypeName });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return {
    onLikeToggle,
    isLoading,
    isFetching,
    isError,
    error,
    data: modifiedLikesData,
    columns,
    page,
    pagination: data?.pagination,
    cancel,
    onLikeCreate,
    isFetchingCreateLike: createLikeMutation.isLoading,
    handlePageChange,
  };
};

export default useLikesData;
