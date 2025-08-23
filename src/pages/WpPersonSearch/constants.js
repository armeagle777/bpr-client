import dayjs from "dayjs";

export const initialFilters = {
  document_number: "",
  fisrt_name_arm: "",
  last_name_arm: "",
  fisrt_name_lat: "",
  last_name_lat: "",
  psn: "",
  select_gender: "",
  select_country: "",
  birth_date_start: null,
  birth_date_end: null,
};

export const genderOptions = [
  {
    label: "Gender",
    value: 0,
  },
  {
    label: "Male",
    value: 1,
  },
  {
    label: "Female",
    value: 2,
  },
];

export const procedureOptions = [
  { value: 0, label: "Procedure" },
  { value: "Employee", label: "Employee" },
  { value: "EAEU", label: "EAEU citizen" },
  { value: "FAMILY", label: "EAEU family member" },
];

export const claimsTabColumns = [
  {
    title: "Claim ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Դիմումի ամսաթիվ",
    dataIndex: "claimDate",
    key: "claimDate",
    render: (_, record) => {
      return record?.created_at
        ? dayjs(record.created_at).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
  },
  {
    title: "Դիմումի տեսակ",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Դիմումի կարգավիճակ",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Գործ վարող",
    dataIndex: "officer_name",
    key: "officer_name",
    render: (_, record) => {
      const { officer_name, officer_last_name } = record;
      return `${officer_name ?? ""} ${officer_last_name ?? ""}`;
    },
  },
  {
    title: "Որոշում",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Որոշման №",
    dataIndex: "send_number",
    key: "send_number",
  },
  {
    title: "Որոշման ամսաթիվ",
    dataIndex: "log_created_at",
    key: "log_created_at",
    render: (_, record) => {
      return record?.log_created_at
        ? dayjs(record.log_created_at).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
  },
];

export const cardsTabColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Քարտ #",
    dataIndex: "serial_number",
    key: "serial_number",
  },
  {
    title: "Տրված է",
    dataIndex: "issue_date",
    key: "issue_date",
  },
  {
    title: "Վավեր է",
    dataIndex: "expire_date",
    key: "expire_date",
  },
  {
    title: "Տպված է",
    dataIndex: "printed_at",
    key: "printed_at",
    render: (_, record) => {
      return record?.printed_at
        ? dayjs(record.printed_at).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
  },
  {
    title: "Փոխանցված է",
    dataIndex: "transferred_at",
    key: "transferred_at",
    render: (_, record) => {
      return record?.transferred_at
        ? dayjs(record.transferred_at).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
  },
  {
    title: "կարգավիճակ",
    dataIndex: "status",
    key: "status",
  },
];

const finesStatusesMap = {
  pending: "'Ծանուցվել է / Չի վճարել'",
  closed: "'Տուգանքը հանվել է'",
  fined: "'Տուգանվել է'",
};

export const ticketsTabColumns = [
  {
    title: "Claim ID",
    dataIndex: "claim_id",
    key: "claim_id",
  },
  {
    title: "Ծանուցման ամսաթիվ",
    dataIndex: "notifyDate",
    key: "notifyDate",
    render: (_, record) => {
      return record?.notify_date
        ? dayjs(record.notify_date).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
  },
  {
    title: "Տուգանքի կարգավիճակ",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      return finesStatusesMap[record.status] || "";
    },
  },
  {
    title: "Որոշման ամսաթիվ",
    dataIndex: "decisionDate",
    key: "decisionDate",
    render: (_, record) => {
      return record?.fined_date
        ? dayjs(record.fined_date).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
  },
];
export const famMemberTabColumns = [
  {
    title: "Անուն",
    dataIndex: "first_name_en",
    key: "first_name_en",
  },
  {
    title: "Ազգանուն",
    dataIndex: "last_name_en",
    key: "last_name_en",
  },
  {
    title: "Փաստաթուղթ",
    dataIndex: "passport_number",
    key: "passport_number",
  },
  {
    title: "ՀԾՀ",
    dataIndex: "ssn",
    key: "ssn",
  },
  {
    title: "Քաղաքացիություն",
    dataIndex: "alpha_3",
    key: "alpha_3",
    render: (_, record) => {
      return `${record?.arm_short} | ${record?.alpha_3}`;
    },
  },
];
