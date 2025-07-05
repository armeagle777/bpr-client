import { DOCUMENT_STATUSES, documentStatusesMap } from "../../utils/constants";
import { texekanqAllowedDocuments } from "./constants";

const isDocumentOutdated = (dateString) => {
  const validityDate = new Date(dateString.split("/").reverse().join("-"));
  const today = new Date();

  return validityDate < today;
};

const getDocumentStatus = (status, validityDate) => {
  if (status === DOCUMENT_STATUSES.INVALID || isDocumentOutdated(validityDate))
    return documentStatusesMap[DOCUMENT_STATUSES.INVALID];

  return documentStatusesMap[status];
};

export const formatCzReportDocsOptionText = (document) => {
  const {
    Document_Number,
    Document_Status,
    Document_Type,
    PassportData: {
      Passport_Issuance_Date,
      Passport_Validity_Date,
      Passport_Validity_Date_FC,
      Passport_Extension_Date,
    } = {},
  } = {
    ...document,
  };

  const optionText = `${Document_Number} - ${getDocumentStatus(
    Document_Status,
    Passport_Validity_Date
  )} | ${Passport_Issuance_Date} - ${Passport_Validity_Date}`;
  return optionText;
};

export const isDocChecked = (allPassports, document) => {
  return allPassports.some(
    (doc) => doc.Document_Number === document.Document_Number
  );
};

export const getAllowedDocuments = (documents) =>
  documents
    ?.filter((doc) => texekanqAllowedDocuments.includes(doc.Document_Type))
    ?.map((doc) => {
      delete doc.Photo_ID;
      return doc;
    });
