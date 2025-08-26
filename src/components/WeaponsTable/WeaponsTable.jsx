import { createStyles } from "antd-style";
import { Table } from "antd";

import "./styles.css";

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
    },
    {
      title: "Անունը",
      dataIndex: "ZANUN_NAME",
      key: "ZANUN_NAME",
      fixed: "left",
    },
    {
      title: "Տ/չ",
      dataIndex: "KALIBR",
      key: "KALIBR",
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
      title: "Պարգևատրություն",
      dataIndex: "PARGEV",
      key: "PARGEV",
    },
    {
      title: "Նշումներ",
      dataIndex: "NOTE",
      key: "NOTE",
    },
    {
      title: "Քր.Գործ N",
      dataIndex: "QRGORCN",
      key: "QRGORCN",
    },
    {
      title: "Քր.Գործ ա/թ",
      dataIndex: "QRGORC_DATE",
      key: "QRGORC_DATE",
    },
    {
      title: "Հոդված",
      dataIndex: "HODVAC",
      key: "HODVAC",
    },
    {
      title: "Վայր",
      dataIndex: "WVAYR",
      key: "WVAYR",
      fixed: "right",
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      className={styles.customTable}
      loading={isFetching}
      dataSource={data}
      scroll={{ x: "max-content" }}
      pagination={false}
      expandable={{
        expandedRowRender: ({
          AZG,
          ANUN,
          HAYR,
          BDATE,
          SSN,
          PASSPORT,
          PASHTON,
          HASCE,
          ABNAK,
          APOXOC,
          ASHENQ,
          ABNAKARAN,
        }) => (
          <p style={{ margin: 0 }}>
            {AZG} {ANUN} {HAYR || ""} | {BDATE} | ՀԾՀ՝ {SSN} | փ/թ՝ {PASSPORT} |{" "}
            {HASCE || ""}, {ABNAK || ""}, {APOXOC || ""} , {ASHENQ || ""}{" "}
            {ABNAKARAN || ""}
          </p>
        ),
      }}
      rowKey="ZHAMAR"
    />
  );
};

export default WeaponsTable;
