export const formatFieldsLabel = (fields) => {
  if (!fields || typeof fields !== "object") return "";

  const labels = {
    ssn: "ՀԾՀ",
    documentNumber: "Անձնագիր",
    firstName: "Անուն",
    lastName: "Ազգանուն",
    patronomicName: "Հայրանուն",
    birthDate: "Ծննդ․ թիվ",
  };

  if (fields.ssn) {
    return `${labels.ssn}: ${fields.ssn}`;
  }

  if (fields.documentNumber) {
    return `${labels.documentNumber}: ${fields.documentNumber}`;
  }

  const nameFields = ["firstName", "lastName", "patronomicName", "birthDate"];
  const presentFields = nameFields
    .filter((key) => fields[key])
    .map((key) => `${labels[key]}: ${fields[key]}`);

  return presentFields.join(" | ");
};
