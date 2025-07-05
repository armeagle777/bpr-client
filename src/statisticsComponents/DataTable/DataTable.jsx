import { Table } from "antd";

import { TableButtonRow } from "..";

import "./DataTable.styles.css";

const RowDataTable = ({
  isLoading,
  modifiedData,
  controlledColumns,
  filters,
}) => {
  return (
    <>
      <TableButtonRow filters={filters} />
      <Table
        pagination={false}
        loading={isLoading}
        dataSource={modifiedData}
        columns={controlledColumns}
        rowClassName={(record, index) =>
          record.name_am === "Ընդամենը" && index === 0 ? "bold-row" : ""
        }
        // scroll={{
        //   x: 1000,
        // }}
        style={{
          marginTop: 8,
        }}
      />
    </>
  );
};

export default RowDataTable;
