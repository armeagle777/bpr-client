import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { createLike, getLikes, toggleLike } from '../api/personsApi';
import { formatDate } from '../components/pdf-templates/templates.helpers';
import { formatFieldsLabel } from '../components/SavedSearchTag/SavedSearchTag.helpers';

const useLikesData = ({ likeTypeName } = {}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { isLoading, isError, error, data } = useQuery(
    ['likes'],
    () => getLikes({ likeTypeName }),
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

  const modifiedLikesData = data?.likes?.map((likeRow) => ({
    ...likeRow,
    key: likeRow.id.toString(),
  }));

  const cancel = (e) => {
    console.log(':>');
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'ՀԾՀ / ՀՎՀՀ',
      dataIndex: 'fields',
      render: (_, record) => {
        const label = formatFieldsLabel(record.fields);
        const destinationUrl = `/bpr/`;
        return <Link to={destinationUrl}>{label}</Link>;
      },
    },
    {
      title: 'Տվյալներ',
      dataIndex: 'text',
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

  const onLikeCreate = ({ fields, likeTypeName }) => {
    createLikeMutation.mutate({ fields, likeTypeName });
  };

  return {
    onLikeToggle,
    isLoading,
    isError,
    error,
    data: modifiedLikesData,
    columns,
    cancel,
    onLikeCreate,
    isFetchingCreateLike: createLikeMutation.isLoading,
  };
};

export default useLikesData;
