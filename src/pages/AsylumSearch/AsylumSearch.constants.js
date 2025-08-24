export const initialFilters = {
  f_name_arm: "",
  l_name_arm: "",
  f_name_eng: "",
  l_name_eng: "",
  doc_num: "",
  select_gender: 0,
  select_country: null,
  select_etnicity: null,
  birth_date_start: null,
  birth_date_end: null,
};

export const genderOptions = [
  {
    label: "Սեռը",
    value: 0,
  },
  {
    label: "Արական",
    value: 1,
  },
  {
    label: "Իգական",
    value: 2,
  },
];

export const cardsTabColumns = [
  {
    title: "Քարտ #",
    dataIndex: "serial",
    key: "serial",
    render: (_, record) => record?.serial + record?.card_number,
  },
  {
    title: "Տրված է",
    dataIndex: "issued",
    key: "issued",
  },
  {
    title: "Վավեր է",
    dataIndex: "valid",
    key: "valid",
  },
  {
    title: "Հասցե",
    dataIndex: "full_address",
    key: "full_address",
  },
  {
    title: "կարգավիճակ",
    dataIndex: "actual_card",
    key: "actual_card",
    render: (_, record) => (record?.actual_card === 0 ? "Ոչ ակտիվ" : "Ակտիվ"),
  },
];
export const famMemberTabColumns = [
  {
    title: "Անուն",
    dataIndex: "f_name_arm",
    key: "f_name_arm",
  },
  {
    title: "Ազգանուն",
    dataIndex: "l_name_arm",
    key: "l_name_arm",
  },
  {
    title: "Ծննդյան ա/թ",
    dataIndex: "b_day",
    key: "b_day",
    render: (_, record) => `${record.b_day}.${record.b_month}.${record.b_year}`,
  },
  {
    title: "Դերը",
    dataIndex: "ROLE_NAME",
    key: "ROLE_NAME",
  },
  {
    title: "Գործի N",
    dataIndex: "case_id",
    key: "case_id",
  },
];
