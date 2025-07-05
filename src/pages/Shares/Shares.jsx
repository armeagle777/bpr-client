import { Alert, Table } from "antd";
import { Box } from "@mui/material";
import useShareData from "../../hooks/useShareData";
import PageTitle from "../../components/PageTitle/PageTitle";

const Shares = () => {
  const { sharesData, isLoading, isError, error, onCancel, columns } =
    useShareData();

  if (isError) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
      sx={{
        padding: "30px 10px",
      }}
    >
      <PageTitle>Ստացված հաղորդագրություններ</PageTitle>
      <Table
        bordered
        dataSource={sharesData}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: onCancel,
        }}
      />
    </Box>
  );
};

export default Shares;
