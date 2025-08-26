import { Table } from "antd";
import { createStyles } from "antd-style";
import { ExpandRow } from "./components";

const WeaponsTable = ({ isFetching, data }) => {
  const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
      customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
          }
        }
      `,
    };
  });

  const { styles } = useStyle();
  const columns = [
    {
      title: "N",
      dataIndex: "ZHAMAR",
      key: "ZHAMAR",
      fixed: "left",
      width: 100,
    },
    {
      title: "Անունը",
      dataIndex: "ZANUN_NAME",
      key: "ZANUN_NAME",
      fixed: "left",
      width: 100,
    },
    {
      title: "Տեսակը",
      dataIndex: "ZTYPE_NAME",
      key: "ZTYPE_NAME",
    },
    {
      title: "Թույլտվության տ/կ",
      dataIndex: "TTYPE_NAME",
      key: "TTYPE_NAME",
    },
    {
      title: "Թույլտվության ա/թ",
      dataIndex: "TDATE",
      key: "TDATE",
    },
    {
      title: "Պատկանում է",
      dataIndex: "ZPATK1_NAME",
      key: "ZPATK1_NAME",
    },
    {
      title: "Գրանցված է",
      dataIndex: "GRANC_NAME",
      key: "GRANC_NAME",
    },
    {
      title: "Բաժինը",
      dataIndex: "TBAJIN",
      key: "TBAJIN",
    },
    {
      title: "ԱԱՀ",
      dataIndex: "AZG",
      key: "AZG",
      render: (_, { AZG, ANUN, HAYR }) =>
        `${ANUN || ""} ${AZG || ""} ${HAYR || ""}`,
    },
    {
      title: "Ծննդ. ա/թ",
      dataIndex: "BDATE",
      key: "BDATE",
    },
    {
      title: "ՀԾՀ",
      dataIndex: "SSN",
      key: "SSN",
    },
    {
      title: "Փ/թ",
      dataIndex: "PASSPORT",
      key: "PASSPORT",
    },
    {
      title: "Հասցե",
      dataIndex: "HASCE",
      key: "HASCE",
      render: (_, { HASCE, ABNAK, APOXOC, ASHENQ, ABNAKARAN }) =>
        `${HASCE || ""}, ${ABNAK || ""}, ${APOXOC || ""} , ${ASHENQ || ""} ${
          ABNAKARAN || ""
        }`,
    },
    {
      title: "Տ/չ",
      dataIndex: "KALIBR",
      key: "KALIBR",
      fixed: "right",
      width: 100,
    },
  ];

  return (
    <Table
      bordered
      rowKey="ZHAMAR"
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={isFetching}
      scroll={{ x: "max-content" }}
      className={styles.customTable}
      expandable={{
        expandedRowRender: (record) => <ExpandRow {...record} />,
        rowExpandable: (record) =>
          !!record.HODVAC.trim() || !!record.PARGEV.trim(),
      }}
    />
  );
};

export default WeaponsTable;
