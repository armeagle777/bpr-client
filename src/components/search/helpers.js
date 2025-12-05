const getRaAddressSignature = (raAddress = {}) => ({
  location_code: raAddress.location_code || 'NO_LOCATION',
  region: raAddress.region || 'NO_REGION',
  community: raAddress.community || 'NO_COMMUNITY',
  street: raAddress.street || 'NO_STREET',
  building: raAddress.building || 'NO_BUILDING',
  building_type: raAddress.building_type || 'NO_BUILDING_TYPE',
  apartment: raAddress.apartment || 'NO_APARTMENT',
});

const getFcAddressSignature = (fcAddress = {}) => ({
  country_code:
    fcAddress.foreign_country?.code ||
    fcAddress.foreign_country?.short_name ||
    fcAddress.foreign_country?.name ||
    'NO_COUNTRY',
  region: fcAddress.foreign_region || 'NO_FOREIGN_REGION',
  community: fcAddress.foreign_community || 'NO_FOREIGN_COMMUNITY',
  city: fcAddress.foreign_city || 'NO_FOREIGN_CITY',
  street: fcAddress.foreign_street || 'NO_FOREIGN_STREET',
  building: fcAddress.foreign_building || 'NO_FOREIGN_BUILDING',
  apartment: fcAddress.foreign_apartment || 'NO_FOREIGN_APARTMENT',
});

const buildAddressSignature = (address = {}) => {
  const regData = address.registration_data || {};
  const regAddress = address.registration_address || {};
  const raAddress = regAddress.ra_address;
  const fcAddress = regAddress.fc_address;

  const baseSignature = {
    status: regData.regist_status || 'REG_STATUS_UNKNOWN',
    type: regData.regist_type || 'REG_TYPE_UNKNOWN',
  };

  const addressSignature = raAddress
    ? { mode: 'RA', ...getRaAddressSignature(raAddress) }
    : { mode: 'FC', ...getFcAddressSignature(fcAddress || {}) };

  return JSON.stringify({ ...baseSignature, ...addressSignature });
};

export const dedupeAddressesByStatusAndCode = (addresses = []) => {
  const seen = new Set();

  return addresses.filter((address = {}) => {
    const key = buildAddressSignature(address);

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
