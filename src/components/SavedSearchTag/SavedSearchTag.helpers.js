export const formatFieldsLabel = (fields) => {
  if (!fields || typeof fields !== 'object') return '';

  const labels = {
    ssn: 'ՀԾՀ',
    documentNumber: 'Անձնագիր',
    firstName: 'Անուն',
    lastName: 'Ազգանուն',
    patronomicName: 'Հայրանուն',
    birthDate: 'Ծննդ․ թիվ',
    name: 'Անվանում',
    taxId: 'ՀՎՀՀ',
    type: 'Տեսակը',
    PLATE_NUMBER: 'Հաշվառման Համարանիշ',
    VIN_CODE: 'VIN',
    CERTIFICATE_NUMBER: 'Հաշվառման վկ.',
    DRIVING_LICENSE: 'Վարորդական վկ.',
  };

  // StateRegister saved Likes
  if (fields.taxId) return `${labels.taxId}: ${fields.taxId}`;
  if (fields.name && fields.type)
    return `${labels.name}: ${fields.name}, ${labels.type}: ${fields.type}`;
  if (fields.name) return `${labels.name}: ${fields.name}`;
  if (fields.type) return `${labels.type}: ${fields.type}`;

  //RoadPolice saved Likes
  if (fields.PLATE_NUMBER) return `${labels.PLATE_NUMBER}: ${fields.PLATE_NUMBER}`;
  if (fields.VIN_CODE) return `${labels.VIN_CODE}: ${fields.VIN_CODE}`;
  if (fields.CERTIFICATE_NUMBER)
    return `${labels.CERTIFICATE_NUMBER}: ${fields.CERTIFICATE_NUMBER}`;
  if (fields.DRIVING_LICENSE) return `${labels.DRIVING_LICENSE}: ${fields.DRIVING_LICENSE}`;

  if (fields.ssn) {
    return `${labels.ssn}: ${fields.ssn}`;
  }

  if (fields.SSN) {
    return `${labels.ssn}: ${fields.SSN}`;
  }

  if (fields.documentNumber) {
    return `${labels.documentNumber}: ${fields.documentNumber}`;
  }

  const nameFields = ['firstName', 'lastName', 'patronomicName', 'birthDate'];
  const presentFields = nameFields
    .filter((key) => fields[key])
    .map((key) => `${labels[key]}: ${fields[key]}`);

  return presentFields.join(' | ');
};
