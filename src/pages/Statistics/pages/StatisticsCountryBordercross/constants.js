export const MOCK_COLUMNS = [
  {
    title: "Քաղաքացիություն",
    dataIndex: "country",
    key: "country",
    width: 200,
    fixed: "left",
  },
  {
    title: "Օդային",
    children: [
      {
        title: "Մուտք",
        dataIndex: "air_in",
        key: "air_in",
        width: 150,
      },
      {
        title: "Ելք",
        dataIndex: "air_out",
        key: "air_out",
        width: 150,
      },
      {
        title: "Տարբերություն",
        dataIndex: "air_net",
        key: "air_net",
        width: 150,
      },
    ],
  },
  {
    title: "Ցամաքով",
    children: [
      {
        title: "Մուտք",
        dataIndex: "land_in",
        key: "land_in",
        width: 150,
      },
      {
        title: "Ելք",
        dataIndex: "land_out",
        key: "land_out",
        width: 150,
      },
      {
        title: "Տարբերություն",
        dataIndex: "land_net",
        key: "land_net",
        width: 150,
      },
    ],
  },
  {
    title: "Երկաթգծով",
    children: [
      {
        title: "Մուտք",
        dataIndex: "railway_in",
        key: "railway_in",
        width: 150,
      },
      {
        title: "Ելք",
        dataIndex: "railway_out",
        key: "railway_out",
        width: 150,
      },
      {
        title: "Տարբերություն",
        dataIndex: "railway_net",
        key: "railway_net",
        width: 150,
      },
    ],
  },
  {
    title: "Ընդհանուր",
    children: [
      {
        title: "Մուտք",
        dataIndex: "total_in",
        key: "total_in",
        width: 150,
      },
      {
        title: "Ելք",
        dataIndex: "total_out",
        key: "total_out",
        width: 150,
      },
      {
        title: "Տարբերություն",
        dataIndex: "total_net",
        key: "total_net",
        width: 150,
      },
    ],
  },
];
