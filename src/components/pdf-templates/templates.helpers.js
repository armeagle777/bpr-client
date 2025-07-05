const formatFullAddress = ({
  regionCommunity,
  Residence,
  Street,
  Building,
  Building_Type,
  Apartment,
}) =>
  regionCommunity +
    ", " +
    Residence +
    " " +
    Street +
    " " +
    Building +
    Building_Type +
    " - " +
    Apartment || "";

export const formatBprData = ({ documents, addresses }) => {
  const validDocuments = documents?.filter(
    (d) =>
      d.Document_Status === "VALID" || d.Document_Status === "PRIMARY_VALID"
  );
  const invalidDocuments = documents?.filter(
    (d) => d.Document_Status === "INVALID"
  );

  const mainDocument =
    validDocuments?.length > 0
      ? validDocuments[0]
      : invalidDocuments?.length > 0
      ? invalidDocuments[0]
      : {};

  const personInfo = mainDocument?.Person || {};

  const currentAddress =
    addresses?.find(
      (a) => a.RegistrationData?.Registration_Type === "CURRENT"
    ) || addresses[0];

  const { RegistrationAddress } = { ...currentAddress };
  const {
    Apartment = "",
    Building = "",
    Building_Type = "",
    Community = "",
    LocationCode = "",
    Postal_Index = "",
    Region = "",
    Residence = "",
    Street = "",
  } = { ...RegistrationAddress };

  const regionCommunity =
    Region === Community ? Region : Region + ", " + Community;

  const fullAddress = formatFullAddress({
    Street,
    Building,
    Apartment,
    Residence,
    Building_Type,
    regionCommunity,
  });

  const ctzText =
    personInfo.Citizenship?.Citizenship?.map((ctz) => ctz.CountryName) || "";

  const birthRegion =
    personInfo.Birth_Region || personInfo.Birth_Country?.CountryName || "";

  const imageSrc = mainDocument.Photo_ID
    ? `data:application/pdf;base64,${mainDocument.Photo_ID}`
    : "/male.png";

  return {
    ctzText,
    imageSrc,
    personInfo,
    birthRegion,
    fullAddress,
    currentAddress,
    validDocuments,
    invalidDocuments,
  };
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatIsoDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

export const checkSamePerson = ({ presenter, person, person2 }) => {
  return (
    (presenter?.base_info?.name === person?.base_info?.name &&
      presenter?.base_info?.last_name === person?.base_info?.last_name) ||
    (presenter?.base_info?.name === person2?.base_info?.name &&
      presenter?.base_info?.last_name === person2?.base_info?.last_name)
  );
};

export function reformatDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
