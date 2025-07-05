export const MOCK_DATA = [
  {
    country: "Ռուսաստան",
    F_16: 332,
    M_16: 933,
    T_16: 1265,
    F_35: 139,
    M_35: 683,
    T_35: 822,
    F_65: 0,
    M_65: 7,
    T_65: 7,
    F_T: 472,
    M_T: 1625,
    T_T: 2097,
  },
  {
    country: "Ղազախստան",
    F_16: 2,
    M_16: 7,
    T_16: 9,
    F_35: 3,
    M_35: 4,
    T_35: 7,
    F_65: 0,
    M_65: 0,
    T_65: 0,
    F_T: 5,
    M_T: 11,
    T_T: 16,
  },
  {
    country: "Բելառուս",
    F_16: 12,
    M_16: 11,
    T_16: 23,
    F_35: 6,
    M_35: 11,
    T_35: 17,
    F_65: 0,
    M_65: 0,
    T_65: 0,
    F_T: 18,
    M_T: 22,
    T_T: 40,
  },
];

export const MOCK_COLUMNS = [
  {
    title: "Քաղաքացիություն",
    dataIndex: "country",
    key: "name",
    width: 200,
    fixed: "left",
  },
  {
    title: "16-34 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "F_16",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_16",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_16",
        key: "total",
        width: 150,
      },
    ],
  },
  {
    title: "35-64 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "F_35",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_35",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_35",
        key: "total",
        width: 150,
      },
    ],
  },
  {
    title: "65-ից ավել",
    children: [
      {
        title: "Ի",
        dataIndex: "F_65",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_65",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_65",
        key: "total",
        width: 150,
      },
    ],
  },
  {
    title: "ԸՆԴԱՄԵՆԸ",
    children: [
      {
        title: "Ի",
        dataIndex: "F_T",
        key: "F",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "M_T",
        key: "M",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "T_T",
        key: "total",
        width: 150,
      },
    ],
  },
];

export const MOCK_COUNTRIES_OPTIONS = [
  {
    label: "Armenia",
    value: "Armenia",
  },
  {
    label: "Russia",
    value: "Russia",
  },
  {
    label: "Iran",
    value: "Iran",
  },
];

export const MOCK_REPORT_PERIODS = [
  {
    label: "1-ին կիսամյակ",
    value: "h1",
    key: "h1",
  },
  {
    label: "2-րդ կիսամյակ",
    value: "h2",
    key: "h2",
  },
  {
    label: "տարեկան",
    value: "annual",
    key: "annual",
  },
];
