import MarriageIcon from "@mui/icons-material/VolunteerActivism";
import BirthIcon from "@mui/icons-material/Cake";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Qkag from "../components/pdf-templates/Qkag";

export const documentNames = {
  marriage: {
    name: "Ամուսնության Վկայական",
    icon: <MarriageIcon color="primary" />,
    template: Qkag,
  },
  birth: {
    name: "Ծննդյան Վկայական",
    icon: <BirthIcon color="primary" />,
    template: Qkag,
  },
  divorce: {
    name: "Ամուսնալուծության Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  death: {
    //TODO Make template Death
    name: "Մահվան Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  adoption: {
    //TODO Make template Adoption
    name: "Որդեգրման վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  paternity: {
    name: "Հայրության ճանաչման Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  chname: {
    //TODO Make template Chname
    name: "Անվանափոխության Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
};

export const qkagDocumentTypes = {
  p: "Անձնագիր",
  id: "Նույնականացման քարտ",
  b: "Ծննդյան վկայական",
  fp: "Արտասահմանյան անձնագիր",
  fb: "Արտասահմանյան ծննդյան վկայական",
  f9: "Ձեւ 9 տեղեկանք",
  f1: "Ձեւ 1 փաստաթուղթ",
  cd: "Կոնվենցիոն ՃՓ",
  tid: "Ժամանակավոր անձը հաստատող փ/թ",
  rc: "Կացության քարտ",
  ic: "Անձը հաստատող վկայական",
  mc: "Զինգրքույկ",
  pr: "Տեղեկանք ԱՎՎ ԱԲ",
  td: "ԱՎՎ ՃՓ",
  cr: "Վերադարձի վկայական",
  bio: "Բիոմետրիկ անձնագիր",
  ref: "Փախստականի վկայական",
  oth: "Այլ",
};

export const deathReasons = {
  1: "Հիվանդությունից",
  2: "Արտադրության հետ չկապված դժբախտ պատահարից",
  3: "Արտադրության հետ կապված դժբախտ պատահարից",
  4: "Սպանությունից",
  5: "Ինքնասպանությունից",
  6: "Մահվան բնույթն անորոշ է",
  7: "Ռազմական իրադարձությունների հետևանքով",
  8: "Ահաբեկչական գործողությունների հետևանքով",
};

export const eduLevelsMap = {
  none: "Չունի",
  sec: "Միջնակարգ",
  secpro: "Միջնակարգ մասնագիտական",
  high: "Բարձրագույն",
  bach: "Թերի բարձրագույն",
  defsec: "Թերի միջնակարգ",
  mast: "Մագիստրատուրա",
  primary: "Տարրական",
  highschool: "Ավագ դպրոց",
};

export const maritalStatusesMap = {
  m: "Ամուսնացած",
  u: "Ամուսնացած չի եղել",
  d: "Ամուսնալուծված",
  w: "Այրի",
};

export const bprDocumentTypes = {
  ID_CARD: "Նույնականացման քարտ",
  NON_BIOMETRIC_PASSPORT: "ՀՀ անձնագիր",
  BIOMETRIC_PASSPORT: "Կենսաչափ․ անձնագիր",
  BIRTH_CERTIFICATE: "Ծննդյան․ վկ․",
  TRAVEL_DOCUMENT: "Ճամփորդական փ/թ",
  FOREIGN_PASSPORT: "Օտարերկրյա անձ․",
  RESIDENCE_CARD: "Կացության քարտ",
  OTHER: "Այլ",
};

export const perPageCount = 10;

export const filterDefaultObj = {
  age: {},
  gender: { maleCount: 0, femaleCount: 0 },
  region: {
    yerevan: 0,
    aragatsotn: 0,
    ararat: 0,
    armavir: 0,
    gegharquniq: 0,
    kotayq: 0,
    lori: 0,
    shirak: 0,
    syuniq: 0,
    tavush: 0,
    vayotsDzor: 0,
    other: 0,
  },
};

export const companyDocumentNames = {
  statement: { title: "ՔԱՂՎԱԾՔ", icon: <DescriptionIcon /> },
  charter: { title: "ԿԱՆՈՆԱԴՐՈՒԹՅՈՒՆ", icon: <AccountBalanceIcon /> },
  unknown: { title: "ՓԱՍՏԱԹՈՒՂԹ", icon: <DescriptionIcon /> },
};

export const messages = {
  excelFromFile: {
    uploadSuccess: "Նիշքը հաջողությամբ բեռնվել է",
  },
  excelTable: {
    errorMessage: "Խնդիր է առաջացել",
    noData: "Տվյալներ առկա չեն",
  },
};

export const MOCK_MONTHS = [
  {
    label: "Հունվար",
    value: 1,
    key: "Հունվար",
  },
  {
    label: "Փետրվար",
    value: 2,
    key: "Փետրվար",
  },
  {
    label: "Մարտ",
    value: 3,
    key: "Մարտ",
  },
  {
    label: "Ապրիլ",
    value: 4,
    key: "Ապրիլ",
  },
  {
    label: "Մայիս",
    value: 5,
    key: "Մայիս",
  },
  {
    label: "Հունիս",
    value: 6,
    key: "Հունիս",
  },
  {
    label: "Հուլիս",
    value: 7,
    key: "Հուլիս",
  },
  {
    label: "Օգոստոս",
    value: 8,
    key: "Օգոստոս",
  },
  {
    label: "Սեպտեմբեր",
    value: 9,
    key: "Սեպտեմբեր",
  },
  {
    label: "Հոկտեմբեր",
    value: 10,
    key: "Հոկտեմբեր",
  },
  {
    label: "Նոյեմբեր",
    value: 11,
    key: "Նոյեմբեր",
  },
  {
    label: "Դեկտեմբեր",
    value: 12,
    key: "Դեկտեմբեր",
  },
];

export const MOCK_PERIODS = [
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
  {
    label: "1-ին եռամսյակ",
    value: "q1",
    key: "q1",
  },
  {
    label: "2-րդ եռամսյակ",
    value: "q2",
    key: "q2",
  },
  {
    label: "3-րդ եռամսյակ",
    value: "q3",
    key: "q3",
  },
  {
    label: "4-րդ եռամսյակ",
    value: "q4",
    key: "q4",
  },
  {
    label: "9֊ամսյակ",
    value: "9monthly",
    key: "9monthly",
  },
  {
    label: "ամսական",
    value: "monthly",
    key: "monthly",
  },
];

export const periodsMap = {
  H1: "h1",
  H2: "h2",
  ANNUAL: "annual",
  Q1: "q1",
  Q2: "q2",
  Q3: "q3",
  Q4: "q4",
  "9MONTHLY": "9monthly",
  MONTHLY: "monthly",
};

export const STATISTICS_FILTERS = {
  DECISION_TYPE: "decType",
  YEAR: "year",
  PERIOD: "period",
  MONTH: "month",
  BORDERCROSS_TYPE: "borderCross",
  REPORT_TYPE: "report_type",
  CLAIM_TYPE: "claim_type",
  WP_TYPE: "wp_type",
};

export const ANT_BTN_TYPES = {
  PRIMARY: "primary",
  DEFAULT: "default",
};

export const STATISTICS_TYPE_MAPS = {
  B_CROSS_TOTAL: "borderCrossTotal",
  B_CROSS_COUNTRIES: "borderCrossCountries",
  B_CROSS_PERIOD: "borderCrossPeriod",
  ASYLUM_TOTAL: "asylumTotal",
  ASYLUM_APPLICATIONS: "asylumApplications",
  ASYLUM_DECISIONS: "asylumDecisions",
  ASYLUM_YEARS: "asylumYears",
  WP_SIMPLE: "wpSimple",
};

export const DOWNLOAD_FILE_TYPES = {
  EXCEL: "excel",
  PDF: "pdf",
};

export const FILE_MIME_TYPES = {
  EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  PDF: "application/pdf",
};

export const permissionsMap = {
  BPR: {
    uid: "1000",
    name: "ԲՊՌ",
    description: "ԲՊՌ Որոնում",
  },
  PETREGISTER: {
    uid: "2000",
    name: "ՊետՌեգիստր",
    description: "Ռեգիստրի Որոնում",
  },
  POLICE: {
    uid: "3000",
    name: "ՆԳՆ",
    description: "Ոստիկանության Որոնում",
  },
  TAX: {
    uid: "4000",
    name: "ՊԵԿ",
    description: "Հարկային Որոնում",
  },
  ZAQS: {
    uid: "5000",
    name: "ՔԿԱԳ",
    description: "ՔԿԱԳ Որոնում",
  },
  STATISTICS: {
    uid: "6000",
    name: "Վիճակագրություն",
    description: "Վիճակագրական տվյալներ",
  },
  KADASTR: {
    uid: "7000",
    name: "Կադաստր",
    description: "Կադաստրի պետական կոմիտե",
  },
  KADASTR_CERTIFICATE: {
    uid: "7001",
    name: "Սեփականության վկայական",
    description: "Կադաստր ըստ սեփ. վկայականի",
  },
  ARTSAKH: {
    uid: "8000",
    name: "Տեղահանություն",
    description: "Արցախի տեղահանության տեղեկատվություն",
  },
  WP: {
    uid: "9000",
    name: "Աշխատանքի թույլտվություն",
    description: "Արցախի տեղահանության տեղեկատվություն",
  },
  CITIZENSHIP_REPORT: {
    uid: "10001",
    name: "Քաղաքացիության տեղեկանք",
    description: "Տեղեկանք անձի քաղաքացիության վերաբերյալ(Ձև 3)",
  },
  PASSPORTS_REPORT: {
    uid: "10002",
    name: "Անձնագրերի տեղեկանք",
    description: "Տեղեկանք անձի անձնագրերի վերաբերյալ",
  },
  PNUM_REPORT: {
    uid: "10003",
    name: "ՀԾՀ տեղեկանք",
    description: "Տեղեկանք անձի ՀԾՀ վերաբերյալ",
  },
  BORDERCROSS: {
    uid: "20000",
    name: "Սահմանահատումներ",
    description:
      "Տեղեկատվություն անձի սահմանահատումների, վիզաների և կացության քարտերի վերաբերյալ",
  },
  ROADPOLICE: {
    uid: "30000",
    name: "ՃՈ",
    description:
      "ՃՈ տեղեկատվություն անձի մեքենաների և վարորդական վկ. վերաբերյալ",
  },
  ROADPOLICE_FULL_SEARCH: {
    uid: "40000",
    name: "ՃՈ ամբողջական որոնում",
    description: "ՃՈ տեղեկատվության որոնում բոլոր պարամետրերով",
  },
  WP_PERSON_SEARCH: {
    uid: "50000",
    name: "Աշխ թույլտվության անձի որոնում",
    description:
      "Անձի  որոնում աշխ թույլտվության համակարգում բոլոր պարամետրերով",
  },
  ADMIN: {
    uid: "9999",
    name: "Ադմինիստրատոր",
    description: "Ադմինիստրատոր",
  },
};

export const MOCK_YEARS = [
  2000, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
].map((year) => ({
  label: `${year}`,
  value: year,
  key: year,
}));

export const documentStatusesMap = {
  PRIMARY_VALID: "Վավեր",
  VALID: "Վավեր",
  INVALID: "Անվավեր",
};

export const DOCUMENT_STATUSES = {
  PRIMARY_VALID: "PRIMARY_VALID",
  VALID: "VALID",
  INVALID: "INVALID",
};
