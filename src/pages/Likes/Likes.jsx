import { Alert, Table } from "antd";
import { Box } from "@mui/material";
import useLikesData from "../../hooks/useLikesData";
import PageTitle from "../../components/PageTitle/PageTitle";

const Likes = () => {
  const { isLoading, isError, error, data, columns, cancel } = useLikesData();

  if (isError) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
      sx={{
        padding: "30px 10px",
      }}
    >
      <PageTitle>Պահպանված Որոնումներ</PageTitle>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Likes;
