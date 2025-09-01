import { v4 } from "uuid";
import StyledTableCell from "../components/finances/StyledTableCell";
import ThCell from "../components/finances/ThCell";
import TdCell from "../components/finances/TdCell";

export const formatCountryName = (countryName) => {
  const countryNameArray = countryName.split(" ");

  if (countryNameArray.length === 1) {
    return countryName;
  }

  let name = "";
  for (let word of countryNameArray) {
    name += word[0];
  }

  return name;
};

export const findCurrentAddress = (addresses) => {
  const registrationAddress =
    addresses.find(
      (address) => address.RegistrationData.Registration_Type === "CURRENT"
    ) || addresses[0];

  const headerAddressObject = { ...registrationAddress?.RegistrationAddress };

  return headerAddressObject;
};

export const formatAddressString = (addresses) => {
  let addressString;
  const currentAddressObj = findCurrentAddress(addresses);
  const {
    Apartment,
    Building,
    Building_Type,
    Community,
    Region,
    Residence,
    Street,
    Foreign_Address,
    Foreign_Community,
    Foreign_Country,
    Foreign_Region,
  } = currentAddressObj;

  if (!Foreign_Country) {
    addressString = `Հայաստան ${
      Region === Community ? Region : Region + " " + Community
    }, ${Residence || ""}, ${Street || ""}  ${
      (Building_Type || "", Building || "")
    }, ${Apartment || ""}`;
  } else {
    addressString = `${Foreign_Country.CountryName || ""} ${
      Foreign_Region || ""
    }, ${Foreign_Community || ""}, ${Foreign_Address || ""}`;
  }

  return addressString;
};

export const findValidDocument = (documents) => {
  const validDocument =
    documents.find((doc) => doc.Document_Status === "PRIMARY_VALID") ||
    documents[0];

  return validDocument;
};

export const searchRowPersonData = (documents) => {
  const avatar = documents.find((doc) => doc.Photo_ID)?.Photo_ID;
  const validDoc = findValidDocument(documents);
  const {
    Document_Department,
    Document_Number,
    PassportData: { Passport_Issuance_Date, Passport_Validity_Date } = {},
    Person: {
      Genus,
      First_Name,
      Last_Name,
      Patronymic_Name,
      English_First_Name,
      English_Last_Name,
      English_Patronymic_Name,
      Birth_Date,
    } = {},
  } = { ...validDoc };
  const rowData = {
    avatar,
    gender: Genus,
    department: Document_Department || "",
    docNum: Document_Number || "",
    issueDate: Passport_Issuance_Date || "",
    validDate: Passport_Validity_Date || "",
    firstName: First_Name || English_First_Name || "",
    lastName: Last_Name || English_Last_Name || "",
    middleName: Patronymic_Name || English_Patronymic_Name || "",
    birthDate: Birth_Date || "",
  };

  return rowData;
};

export const formatPersonData = (personInfo) => {
  const { addresses, documents, ...unChangedData } = { ...personInfo };

  const currentAddressObj = findCurrentAddress(addresses);

  const allCitizenships = documents
    .reduce((acc, doc) => {
      const { Citizenship } = { ...doc.Person?.Citizenship };
      if (Citizenship) {
        acc = [...acc, ...doc.Person.Citizenship.Citizenship];
      }
      return acc;
    }, [])
    .map((obj) => obj.CountryName)
    .reduce((acc, countryName) => {
      if (!acc.includes(countryName)) {
        acc.push(countryName);
      }

      return acc;
    }, [])
    .map((name) => {
      const citizenshipNamesArray = name?.split(" ");
      if (citizenshipNamesArray?.length === 1) {
        return citizenshipNamesArray;
      }

      return citizenshipNamesArray?.reduce((acc, name) => {
        acc += name[0];
        return acc;
      }, "");
    })
    .join(",");

  const {
    Person: {
      English_First_Name,
      English_Last_Name,
      English_Patronymic_Name,
      First_Name,
      Last_Name,
      Patronymic_Name,
      Genus,
      Nationality,
      Birth_Date,
      Birth_Country,
      Birth_Region,
      Birth_Community,
      Birth_Address,
    },
  } = { ...findValidDocument(documents) };

  const NationalityName = Nationality?.NationalityName || "";
  const CountryName = Birth_Country?.Birth_Country || "";

  return {
    titleAddress: {
      ...currentAddressObj,
    },
    titlePerson: {
      allCitizenships,
      firstName: First_Name,
      lastName: Last_Name,
      middleName: Patronymic_Name,
      firstNameEng: English_First_Name,
      lastNameEng: English_Last_Name,
      middleNameEng: English_Patronymic_Name,
      gender: Genus === "M" ? "ԱՐԱԿԱՆ" : "ԻԳԱԿԱՆ",
      NationalityName,
      birthDate: Birth_Date,
      birthCountry: formatCountryName(CountryName),
      birthRegion: Birth_Region || Birth_Community || Birth_Address,
      ...unChangedData,
    },
    addresses,
    documents,
  };
};

export const filterImageSrcs = (docs, gender, birthDate) => {
  const images = docs.reduce((acc, doc) => {
    doc.Photo_ID && acc.push(`data:image/jpeg;base64,${doc.Photo_ID}`);

    return acc;
  }, []);

  if (images.length > 0) {
    return images;
  }

  const birthYear = birthDate.split("/")[2];
  const age = new Date().getFullYear() - birthYear;
  const noImageSrc =
    age < 18
      ? "../baby.png"
      : gender === "ԱՐԱԿԱՆ"
      ? "../male.png"
      : "../female.png";

  return [noImageSrc];
};

export const formatDates = (date) => {
  return date;
};

export const formatedData = (periods) => {
  return [...periods].reduce(
    (acc, { date, personInfo }) => {
      acc.titles.push(
        <StyledTableCell align="right" key={v4()} sx={{ fontSize: "10px" }}>
          {date}
        </StyledTableCell>
      );
      acc.salaryEquivPayments.push(
        <TdCell data={personInfo.salaryEquivPayments} key={v4()} />
      );
      acc.incomeTax.push(<TdCell data={personInfo.incomeTax} key={v4()} />);
      acc.civilLowContractPayments.push(
        <TdCell data={personInfo.civilLowContractPayments} key={v4()} />
      );
      acc.socialpayments.push(
        <TdCell data={personInfo.socialpayments} key={v4()} />
      );
      acc.socialpaymentspaid.push(
        <TdCell data={personInfo.socialpaymentspaid} key={v4()} />
      );
      acc.workinghours.push(
        <TdCell data={personInfo.workinghours} key={v4()} />
      );

      return acc;
    },
    {
      titles: [<StyledTableCell key={v4()}>...</StyledTableCell>],
      salaryEquivPayments: [
        <ThCell title="Աշխ․ հավասարեցված վճարներ" key={v4()} />,
      ],
      incomeTax: [<ThCell title="Եկամտային հարկ" key={v4()} />],
      civilLowContractPayments: [<ThCell title="Քաղ. պայմ" key={v4()} />],
      socialpayments: [<ThCell title="Հաշվարկված սոց․ վճարներ" key={v4()} />],
      socialpaymentspaid: [<ThCell title="Վճարված սոցվճարներ" key={v4()} />],
      workinghours: [<ThCell title="Աշխատաժամեր" key={v4()} />],
    }
  );
};

export const userHasPermission = (allowedPermissions, userPermissions) => {
  const hasPermission = allowedPermissions?.some((perm) =>
    userPermissions.includes(perm)
  );

  return hasPermission;
};

export const isPersonJpk = (documents) => {
  if (!documents || documents.length === 0) return false;
  return (
    documents.findIndex(
      (doc) =>
        doc.Document_Status === "PRIMARY_VALID" &&
        doc.Document_Type === "NON_BIOMETRIC_PASSPORT" &&
        doc.PassportData?.Passport_Type === "N"
    ) >= 0
  );
};

export const filterUniqueDocuments = (documents = []) =>
  documents.filter(
    (doc, index, self) =>
      index ===
      self.findIndex(
        (d) =>
          d.Document_Type === doc.Document_Type &&
          d.Document_Number === doc.Document_Number
      )
  );

export const getFlattenData = (data) => {
  // Iterate over each key in the data object
  return Object.keys(data).reduce((result, key) => {
    // If the value is an array, flatten it
    if (Array.isArray(data[key])) {
      result[key] = data[key].flat(); // Flatten the array
    } else if (typeof data[key] === "object" && data[key] !== null) {
      // If the value is an object, call flattenData recursively
      result[key] = getFlattenData(data[key]);
    } else {
      // If the value is neither an array nor an object, just keep it
      result[key] = data[key];
    }
    return result;
  }, {});
};

export const getSortedByDateFIeld = (data, fieldName) =>
  data.sort((a, b) => new Date(b[fieldName]) - new Date(a[fieldName]));

export const formatDateTimeString = (datetime, showTime = false) => {
  const date = new Date(datetime);

  const pad = (num) => String(num).padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return showTime
    ? `${day}/${month}/${year} ${hours}:${minutes}`
    : `${day}/${month}/${year}`;
};

export const getDirectionColor = (direction) =>
  direction === "IN" ? "success" : "error";

export const formatAmount = (value, currency) => {
  if (!value) return "N/A";
  const num = Number(value);
  if (isNaN(num)) return value.toString();
  return (
    new Intl.NumberFormat("en-US").format(num) +
    (currency ? ` ${currency}` : "")
  );
};
