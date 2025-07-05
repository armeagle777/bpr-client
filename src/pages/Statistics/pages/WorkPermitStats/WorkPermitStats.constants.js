export const MOCK_COLUMNS = [
  {
    title: "Քաղաքացիություն",
    dataIndex: "name_am",
    key: "name_am",
    width: 200,
    fixed: "left",
  },
  {
    title: "0-34 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "female_under_34",
        key: "female_under_34",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "male_under_34",
        key: "male_under_34",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "total_under_34",
        key: "total_under_34",
        width: 150,
      },
    ],
  },
  {
    title: "35-64 տարեկան",
    children: [
      {
        title: "Ի",
        dataIndex: "female_35_64",
        key: "female_35_64",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "male_35_64",
        key: "male_35_64",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "total_35_64",
        key: "total_35_64",
        width: 150,
      },
    ],
  },
  {
    title: "65-ից ավել",
    children: [
      {
        title: "Ի",
        dataIndex: "female_upper_65",
        key: "female_upper_65",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "male_upper_65",
        key: "male_upper_65",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "total_upper_65",
        key: "total_upper_65",
        width: 150,
      },
    ],
  },
  {
    title: "ԸՆԴԱՄԵՆԸ",
    children: [
      {
        title: "Ի",
        dataIndex: "total_female",
        key: "total_female",
        width: 150,
      },
      {
        title: "Ա",
        dataIndex: "total_male",
        key: "total_male",
        width: 150,
      },
      {
        title: "Ընդ․",
        dataIndex: "grand_total",
        key: "grand_total",
        width: 150,
      },
    ],
  },
];

export const MOCK_REPORT_TYPES = [
  {
    label: "Ստացված դիմումներ",
    value: 1,
    key: 1,
  },
  {
    label: "Ընդունված որոշումներ",
    value: 2,
    key: 2,
  },
];

export const MOCK_CLAIM_TYPES = [
  {
    label: "Բոլորը",
    value: "all",
    key: 1,
  },
  {
    label: "Առաջնային",
    value: "status_claim",
    key: 2,
  },
  {
    label: "Երկարաձգում",
    value: "extension",
    key: 3,
  },
];

export const WP_TYPE_MAPS = {
  WP: "work_permit",
  VOLUNTEER: "volunteer",
  EAEU_EMP: "eaeu_employee",
  EAEU_EMP_FAM: "eaeu_employee_family",
};

export const WP_DEC_TYPES = [
  { label: "Բավարարում", value: "allow", key: "allow" },
  { label: "Մերժում", value: "reject", key: "reject" },
  { label: "Կարճում", value: "cease", key: "cease" },
  { label: "Դադարեցում", value: "terminate", key: "terminate" },
];
