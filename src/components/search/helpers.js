export const dedupeAddressesByStatusAndCode = (addresses = []) => {
  const seen = new Set();

  return addresses.filter((address = {}) => {
    const status = address.registration_data?.regist_status || 'REG_STATUS_UNKNOWN';
    const locationCode = address.registration_address?.ra_address?.location_code || 'NO_LOCATION';

    const key = `${status}-${locationCode}`;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

export const getPreferredDocument = (documents = []) => {
  if (!documents.length) return {};
  const validDocuments = documents.filter((doc) => doc.doc_status === 'PRIMARY_VALID');
  const preferredIdCard = validDocuments.find((doc) => doc.doc_type === 'ID_CARD');
  if (preferredIdCard) return preferredIdCard;
  if (validDocuments.length) return validDocuments[0];
  return documents[0];
};

export const getPhotoDocument = (documents = []) => {
  if (!documents.length) return {};
  return documents.find((doc) => !!doc.photo) || documents[0];
};
