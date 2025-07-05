export const MOCK_COLUMNS = [
  {
    title: "...",
    dataIndex: "main_column",
    key: "main_column",
    width: 200,
    fixed: "left",
  },
  {
    title: "ՀՀ քաղաքացիներ",
    key: "ՀՀ քաղաքացիներ",
    children: [
      {
        title: "Մուտք",
        dataIndex: "arm_in",
        key: "arm_in",
        width: 150,
      },
      {
        title: "Ելք",
        dataIndex: "arm_out",
        key: "arm_out",
        width: 150,
      },
      {
        title: "Տարբերություն",
        dataIndex: "arm_net",
        key: "arm_net",
        width: 150,
      },
    ],
  },
  {
    title: "Օտարերկրացիներ",
    key: "Օտարերկրացիներ",
    children: [
      {
        title: "Մուտք",
        dataIndex: "other_in",
        key: "other_in",
        width: 150,
      },
      {
        title: "Ելք",
        dataIndex: "other_out",
        key: "other_out",
        width: 150,
      },
      {
        title: "Տարբերություն",
        dataIndex: "other_net",
        key: "other_net",
        width: 150,
      },
    ],
  },
  {
    title: "Ընդամենը",
    key: "Ընդամենը",
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
