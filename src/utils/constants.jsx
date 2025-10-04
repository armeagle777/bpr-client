import MarriageIcon from '@mui/icons-material/VolunteerActivism';
import BirthIcon from '@mui/icons-material/Cake';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Qkag from '../components/pdf-templates/Qkag';

export const documentNames = {
  marriage: {
    name: 'Ամուսնության Վկայական',
    icon: <MarriageIcon color="primary" />,
    template: Qkag,
  },
  birth: {
    name: 'Ծննդյան Վկայական',
    icon: <BirthIcon color="primary" />,
    template: Qkag,
  },
  divorce: {
    name: 'Ամուսնալուծության Վկայական',
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  death: {
    //TODO Make template Death
    name: 'Մահվան Վկայական',
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  adoption: {
    //TODO Make template Adoption
    name: 'Որդեգրման վկայական',
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  paternity: {
    name: 'Հայրության ճանաչման Վկայական',
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
  chname: {
    //TODO Make template Chname
    name: 'Անվանափոխության Վկայական',
    icon: <HeartBrokenIcon color="primary" />,
    template: Qkag,
  },
};

export const qkagDocumentTypes = {
  p: 'Անձնագիր',
  id: 'Նույնականացման քարտ',
  b: 'Ծննդյան վկայական',
  fp: 'Արտասահմանյան անձնագիր',
  fb: 'Արտասահմանյան ծննդյան վկայական',
  f9: 'Ձեւ 9 տեղեկանք',
  f1: 'Ձեւ 1 փաստաթուղթ',
  cd: 'Կոնվենցիոն ՃՓ',
  tid: 'Ժամանակավոր անձը հաստատող փ/թ',
  rc: 'Կացության քարտ',
  ic: 'Անձը հաստատող վկայական',
  mc: 'Զինգրքույկ',
  pr: 'Տեղեկանք ԱՎՎ ԱԲ',
  td: 'ԱՎՎ ՃՓ',
  cr: 'Վերադարձի վկայական',
  bio: 'Բիոմետրիկ անձնագիր',
  ref: 'Փախստականի վկայական',
  oth: 'Այլ',
};

export const deathReasons = {
  1: 'Հիվանդությունից',
  2: 'Արտադրության հետ չկապված դժբախտ պատահարից',
  3: 'Արտադրության հետ կապված դժբախտ պատահարից',
  4: 'Սպանությունից',
  5: 'Ինքնասպանությունից',
  6: 'Մահվան բնույթն անորոշ է',
  7: 'Ռազմական իրադարձությունների հետևանքով',
  8: 'Ահաբեկչական գործողությունների հետևանքով',
};

export const eduLevelsMap = {
  none: 'Չունի',
  sec: 'Միջնակարգ',
  secpro: 'Միջնակարգ մասնագիտական',
  high: 'Բարձրագույն',
  bach: 'Թերի բարձրագույն',
  defsec: 'Թերի միջնակարգ',
  mast: 'Մագիստրատուրա',
  primary: 'Տարրական',
  highschool: 'Ավագ դպրոց',
};

export const maritalStatusesMap = {
  m: 'Ամուսնացած',
  u: 'Ամուսնացած չի եղել',
  d: 'Ամուսնալուծված',
  w: 'Այրի',
};

export const bprDocumentTypes = {
  ID_CARD: 'Նույնականացման քարտ',
  NON_BIOMETRIC_PASSPORT: 'ՀՀ անձնագիր',
  BIOMETRIC_PASSPORT: 'Կենսաչափ․ անձնագիր',
  BIRTH_CERTIFICATE: 'Ծննդյան․ վկ․',
  TRAVEL_DOCUMENT: 'Ճամփորդական փ/թ',
  FOREIGN_PASSPORT: 'Օտարերկրյա անձ․',
  RESIDENCE_CARD: 'Կացության քարտ',
  OTHER: 'Այլ',
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
  statement: { title: 'ՔԱՂՎԱԾՔ', icon: <DescriptionIcon /> },
  charter: { title: 'ԿԱՆՈՆԱԴՐՈՒԹՅՈՒՆ', icon: <AccountBalanceIcon /> },
  unknown: { title: 'ՓԱՍՏԱԹՈՒՂԹ', icon: <DescriptionIcon /> },
};

export const messages = {
  excelFromFile: {
    uploadSuccess: 'Նիշքը հաջողությամբ բեռնվել է',
  },
  excelTable: {
    errorMessage: 'Խնդիր է առաջացել',
    noData: 'Տվյալներ առկա չեն',
  },
};

export const ANT_BTN_TYPES = {
  PRIMARY: 'primary',
  DEFAULT: 'default',
};

export const DOWNLOAD_FILE_TYPES = {
  EXCEL: 'excel',
  PDF: 'pdf',
};

export const FILE_MIME_TYPES = {
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PDF: 'application/pdf',
};

export const permissionsMap = {
  BPR: {
    uid: '1000',
    name: 'ԲՊՌ',
    description: 'ԲՊՌ Որոնում',
  },
  PETREGISTER: {
    uid: '2000',
    name: 'ՊետՌեգիստր',
    description: 'Ռեգիստրի Որոնում',
  },
  POLICE: {
    uid: '3000',
    name: 'ՆԳՆ',
    description: 'Ոստիկանության Որոնում',
  },
  WEAPON: {
    uid: '3100',
    name: 'Զենք',
    description: 'Զենքի տեղեկատվության որոնում',
  },
  SEARCH_PERSON_BY_IMAGE: {
    uid: '3200',
    name: 'Որոնում Լուսանկարով',
    description: 'Անձի որոնում լուսանկարով',
  },
  TAX: {
    uid: '4000',
    name: 'ՊԵԿ',
    description: 'Հարկային Որոնում',
  },
  TAX_TAXPAYER_INFO: {
    uid: '4100',
    name: 'ՊԵԿ Հարկ Վճարողի Տվյալներ',
    description: 'Հարկ վճարողի հիմնական տվյալներ',
  },
  TAX_PERSON_ALL_INCOMES: {
    uid: '4200',
    name: 'Անձի եկամուտները',
    description: 'Անձի բոլոր գրանցված եկամուտները',
  },
  TAX_PERSON_ALL_EMPLOYERS: {
    uid: '4300',
    name: 'Անձի աշխատավայրերը',
    description: 'Անձի բոլոր գրանցված աշխատավայրերը',
  },
  TAX_COMPANY_OBLIGATIONS: {
    uid: '4400',
    name: 'Ընկերության պարտավորությունները',
    description: 'Ընկերության պարտավորությունները',
  },
  TAX_COMPANY_EMPLOYEES: {
    uid: '4500',
    name: 'Ընկերության աշխատակիցները',
    description: 'Ընկերության բոլոր աշխատակիցները',
  },
  ZAQS: {
    uid: '5000',
    name: 'ՔԿԱԳ',
    description: 'ՔԿԱԳ Որոնում',
  },
  MOJ_CES: {
    uid: '6001',
    name: 'ԴԱՀԿ',
    description: 'ԴԱՀԿ Համակարգի Որոնում',
  },
  MOJ_CIVIL: {
    uid: '6002',
    name: 'Արդարադատության նախ.',
    description: 'Արդարադատության նախ.',
  },
  MLSA: {
    uid: '6100',
    name: 'Սոցապ',
    description: 'Սոցիալական Վճարումների Որոնում',
  },
  KADASTR: {
    uid: '7000',
    name: 'Կադաստր',
    description: 'Կադաստրի պետական կոմիտե',
  },
  KADASTR_CERTIFICATE: {
    uid: '7001',
    name: 'Սեփականության վկայական',
    description: 'Կադաստր ըստ սեփ. վկայականի',
  },
  ASYLUM: {
    uid: '20000',
    name: 'Փախստականներ',
    description: 'Փախստականների բազայում որոնում',
  },
  WP: {
    uid: '9000',
    name: 'Աշխատանքի թույլտվություն',
    description: 'Արցախի տեղահանության տեղեկատվություն',
  },
  ROADPOLICE: {
    uid: '30000',
    name: 'ՃՈ',
    description: 'ՃՈ տեղեկատվություն անձի մեքենաների և վարորդական վկ. վերաբերյալ',
  },
  ROADPOLICE_TRANSACTIONS: {
    uid: '31000',
    name: 'Տ/Մ հաշվառումներ',
    description: 'Անձի կատարած բոլոր հաշվառման գործարքների պատմության հարցում',
  },
  ROADPOLICE_VIOLATIONS: {
    uid: '32000',
    name: 'ՃՈ իրավախախտումներ',
    description: 'Անձի կատարած իրավախախտումների հարցում',
  },
  ROADPOLICE_FULL_SEARCH: {
    uid: '40000',
    name: 'ՃՈ ամբողջական որոնում',
    description: 'ՃՈ տեղեկատվության որոնում բոլոր պարամետրերով',
  },
  WP_PERSON_SEARCH: {
    uid: '50000',
    name: 'Աշխ թույլտվության անձի որոնում',
    description: 'Անձի  որոնում աշխ թույլտվության համակարգում բոլոր պարամետրերով',
  },
  MTA_PROPERTY_TAXES: {
    uid: '61000',
    name: 'Գույքահարկ',
    description: 'Ֆիզ։ և իրավաբանական անձանց մեքենայի, անշարժ գույքի գույքահարկեր',
  },
  ADMIN: {
    uid: '9999',
    name: 'Ադմինիստրատոր',
    description: 'Ադմինիստրատոր',
  },
  HR: {
    uid: '8888',
    name: 'HR',
    description: 'ՄՌԿ',
  },
};

export const likeTypesMap = {
  bpr: {
    name: 'ԲՊՌ Որոնում',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  stateRegister: {
    name: 'ԻԱՊՌ Որոնում',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  cadaster: {
    name: 'Կադաստրի Որոնում',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  weapon: {
    name: 'Զենքերի Բազայում Որոնում',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  wp: {
    name: 'Աշխ. Թույլտվության Բազայում Որոնում',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  roadPolice: {
    name: 'ՃՈ Որոնում',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  asylum: {
    name: 'Փախստականների Բազայում Որոնում',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const documentStatusesMap = {
  PRIMARY_VALID: 'Վավեր',
  VALID: 'Վավեր',
  INVALID: 'Անվավեր',
};

export const DOCUMENT_STATUSES = {
  PRIMARY_VALID: 'PRIMARY_VALID',
  VALID: 'VALID',
  INVALID: 'INVALID',
};

export const THEME_MODS = {
  DARK: 'dark',
  LIGHT: 'light',
};
