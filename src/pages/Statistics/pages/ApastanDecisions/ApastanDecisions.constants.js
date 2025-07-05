export const MOCK_COLUMNS = [
  {
    title: "Քաղաքացիություն",
    dataIndex: "country_arm",
    key: "country_arm",
    width: 200,
    fixed: "left",
  },
  {
    title: "0-13 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "FEMALE_0_13",
        key: "FEMALE_0_13",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "MALE_0_13",
        key: "MALE_0_13",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "TOTAL_0_13",
        key: "TOTAL_0_13",
        width: 150,
      },
    ],
  },
  {
    title: "14-17 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "FEMALE_14_17",
        key: "FEMALE_14_17",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "MALE_14_17",
        key: "MALE_14_17",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "TOTAL_14_17",
        key: "TOTAL_14_17",
        width: 150,
      },
    ],
  },
  {
    title: "18-34 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "FEMALE_18_34",
        key: "FEMALE_18_34",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "MALE_18_34",
        key: "MALE_18_34",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "TOTAL_18_34",
        key: "TOTAL_18_34",
        width: 150,
      },
    ],
  },
  {
    title: "35-64 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "FEMALE_35_64",
        key: "FEMALE_35_64",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "MALE_35_64",
        key: "MALE_35_64",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "TOTAL_35_64",
        key: "TOTAL_35_64",
        width: 150,
      },
    ],
  },
  {
    title: "65-ից ավել",
    children: [
      {
        title: "Ի",
        dataIndex: "FEMALE_65_PLUS",
        key: "FEMALE_65_PLUS",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "MALE_65_PLUS",
        key: "MALE_65_PLUS",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "TOTAL_65_PLUS",
        key: "TOTAL_65_PLUS",
        width: 150,
      },
    ],
  },
  {
    title: "անհայտ",
    children: [
      {
        title: "Ի",
        dataIndex: "FEMALE_UNKNOWN",
        key: "FEMALE_UNKNOWN",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "MALE_UNKNOWN",
        key: "MALE_UNKNOWN",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "TOTAL_UNKNOWN",
        key: "TOTAL_UNKNOWN",
        width: 150,
      },
    ],
  },
  {
    title: "ԸՆԴԱՄԵՆԸ",
    children: [
      {
        title: "Ի",
        width: 150,
        render: (text, record) => {
          const TOTAL_FEMALE =
            record.FEMALE_0_13 +
            record.FEMALE_14_17 +
            record.FEMALE_18_34 +
            record.FEMALE_35_64 +
            record.FEMALE_65_PLUS +
            record.FEMALE_UNKNOWN;
          return TOTAL_FEMALE;
        },
      },
      {
        title: "Ա",
        key: "TOTAL_MALE",
        width: 150,
        render: (text, record) => {
          const TOTAL_MALE =
            record.MALE_0_13 +
            record.MALE_14_17 +
            record.MALE_18_34 +
            record.MALE_35_64 +
            record.MALE_65_PLUS +
            record.MALE_UNKNOWN;
          return TOTAL_MALE;
        },
      },
      {
        title: "Ընդ․",
        dataIndex: "TOTAL_APPLICATIONS",
        key: "TOTAL_APPLICATIONS",
        width: 150,
      },
    ],
  },
];

export const MOCK_DEC_TYPES = [
  {
    label: "Բավարարում",
    value: 1,
    key: "1",
  },
  {
    label: "Մերժում",
    value: 2,
    key: "2",
  },
  {
    label: "Կարճում",
    value: 3,
    key: "3",
  },
  {
    label: "Դադարեցում",
    value: 4,
    key: "4",
  },
];
