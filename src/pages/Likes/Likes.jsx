import { Alert, Table } from 'antd';
import { Box } from '@mui/material';
import useLikesData from '../../hooks/useLikesData';
import PageTitle from '../../components/PageTitle/PageTitle';

const Likes = () => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    columns,
    handlePageChange,
    page,
    pagination,
  } = useLikesData({
    pageSize: 10,
  });

  if (isError) return <Alert severity="error">{error}</Alert>;
  return (
    <Box
      sx={{
        padding: '30px 10px',
      }}
    >
      <PageTitle>Պահպանված Որոնումներ</PageTitle>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: handlePageChange,
          total: pagination?.total,
        }}
        loading={isFetching || isLoading}
      />
    </Box>
  );
};

export default Likes;
