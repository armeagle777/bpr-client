import axios from "axios";
import { DOWNLOAD_FILE_TYPES, FILE_MIME_TYPES } from "../utils/constants";

const baseUrl = !!localStorage.getItem("serverUrl")
  ? localStorage.getItem("serverUrl")
  : import.meta.env.VITE_SERVER_URL;

const personsApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const checkMyIp = async () => {
  const internalUrl = import.meta.env.VITE_SERVER_URL;
  const ovirNetworkUrl = import.meta.env.VITE_SERVER_OUT_URL;
  const policeNetworkUrl = import.meta.env.VITE_SERVER_POLICE_NETWORK_URL;

  const urls = [internalUrl, ovirNetworkUrl, policeNetworkUrl];

  const requests = urls.map((url) =>
    axios
      .get(url + "/utils/get-ip")
      .then((res) => ({ url, data: res.data }))
      .catch((error) => console.log("Error getting server ip"))
  );
  const result = await Promise.any(requests);
  return result.url;
};

const getCoordsWithAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${import.meta.env.VITE_GOOGLE_MAP_KEY}`
  );
  return response.data;
};

personsApi.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("_auth")}`;
  return config;
});

personsApi.interceptors.response.use(
  (response) => {
    // Return the response if everything is OK
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the server responds with 401 (Unauthorized), clear the token
      localStorage.removeItem("_auth"); // Clear the token from localStorage

      // Optionally clear any refresh token or cookies as well if stored

      // Redirect the user to the login page
      window.location.href = "/login";
    }
    return Promise.reject(error); // Reject other errors
  }
);

// personsApi.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !originalRequest._isRetry
//     ) {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/token/refresh`,
//           { withCredentials: true }
//         );
//         localStorage.setItem("token", response.data.accessToken);
//         return personsApi.request(originalRequest);
//       } catch (error) {
//         console.log("error:::::: User Not authorized");
//       }
//     }
//     throw error;
//   }
// );

export const getCountriesData = async () => {
  const response = await personsApi.get(`/wp/countries/all`);
  return response.data;
};

export const getWpPersonData = async (filters, page) => {
  const response = await personsApi.post(`/wp/person/filter`, {
    filters,
    page,
  });
  return response.data;
};

export const getWpPersonFullData = async (props) => {
  const { id, tablename, user_id } = props;
  const response = await personsApi.post(`/wp/person/${id}/detail`, {
    tablename,
    user_id,
  });
  return response.data;
};

export const getStatisticsData = async (filterObj, url) => {
  const response = await personsApi.post(`/statistics${url}`, filterObj);
  return response.data;
};

export const getStatisticsFile = async (filters, fileType) => {
  const mimeType =
    fileType === DOWNLOAD_FILE_TYPES.PDF
      ? FILE_MIME_TYPES.PDF
      : FILE_MIME_TYPES.EXCEL;

  const fileUrl = `/statistics/export/${fileType}`;

  const config = {
    responseType: "blob",
  };

  const { data } = await personsApi.post(fileUrl, { filters }, config);

  const blob = new Blob([data], {
    type: mimeType,
  });

  return blob;
};

export const getStatisticsPeriodsData = async (statisticsType) => {
  const response = await personsApi.get(
    `/statistics/periods/${statisticsType}`
  );
  return response.data;
};

// Auth endpoints
export const login = async (credentials) => {
  const response = await personsApi.post("/users/login", credentials);
  return response.data;
};

export const logOut = async () => {
  const response = await personsApi.post("/users/logout");
  return response.data;
};

export const getUsers = async () => {
  const response = await personsApi.get("/users");
  return response.data;
};

export const getRoles = async () => {
  const response = await personsApi.get("/roles");
  return response.data;
};

export const getReportTypes = async () => {
  const response = await personsApi.get("/texekanq/types");
  return response.data;
};

export const getPermissions = async () => {
  const response = await personsApi.get("/permissions");
  return response.data;
};

export const getLightUsers = async () => {
  const response = await personsApi.get("/users/light");
  return response.data;
};

export const createUser = async (data) => {
  const response = await personsApi.post(`/users/registration`, data);
  return response.data;
};

export const createTexekanq = async (data) => {
  const response = await personsApi.post(`/texekanq`, data);
  return response.data;
};

export const getTexekanqs = async ({ filters, pagination }) => {
  const queryParams = new URLSearchParams({
    search: filters.search,
    types: filters.types.join(","),
    page: pagination.page,
    pageSize: pagination.pageSize,
  }).toString();

  const response = await personsApi.get(`/texekanq?${queryParams}`);
  return response.data;
};

export const getTexekanqBase64 = async (fileName) => {
  const response = await personsApi.get(`/texekanq/pdf/${fileName}`);
  return response.data;
};

export const createRole = async (data) => {
  const response = await personsApi.post(`/roles`, data);
  return response.data;
};

export const updateUser = async ({ id, data }) => {
  const response = await personsApi.put(`/users/${id}`, data);
  return response.data;
};

export const changePassword = async ({ id, data }) => {
  const response = await personsApi.put(`/users/password/${id}`, data);
  return response.data;
};

export const updateRole = async ({ id, data }) => {
  const response = await personsApi.put(`/roles/${id}`, data);
  return response.data;
};

export const toggleUserActive = async ({ id, data }) => {
  const response = await personsApi.put(`/users/active/${id}`, data);
  return response.data;
};

export const checkEmail = async (email) => {
  const response = await personsApi.post(`/users/check/email`, { email });
  return response.data;
};

export const getLikes = async () => {
  const response = await personsApi.get(`/likes`);
  return response.data;
};

export const getShares = async () => {
  const response = await personsApi.get(`/shares`);
  return response.data;
};

export const shareInfo = async (data) => {
  const response = await personsApi.post(`/shares/share`, data);
  return response.data;
};

export const removeShare = async ({ id, data }) => {
  const response = await personsApi.put(`/shares/remove/${id}`, data);
  return response.data;
};

export const toggleLike = async ({ uid, text }) => {
  const response = await personsApi.post(`/likes/like/${uid}`, { text });
  return response.data;
};

export const getSpheres = async (url) => {
  const response = await personsApi.get("/sphere");
  return response.data;
};

export const getFileBySsn = async (url, personInfo) => {
  const response = await personsApi.post(url, {
    data: personInfo,
    responseType: "blob",
  });
  return response.data;
};

export const getPersonBySsn = async (ssn) => {
  const response = await personsApi.get(`/persons/${ssn}/bpr`);
  return response.data;
};

export const getSearchedPersons = async (searchOptions) => {
  const response = await personsApi.post(`/persons/bpr`, searchOptions);
  return response.data;
};

export const getQkagDocsBySsn = async (ssn, firstName, lastName) => {
  const response = await personsApi.post(`/persons/${ssn}/qkag`, {
    firstName,
    lastName,
  });
  return response.data;
};

export const getPropertiesBySsn = async (ssn) => {
  const response = await personsApi.get(`/kadastr/${ssn}/person`);
  return response.data;
};

export const getDisplacementsBySsn = async (ssn) => {
  const response = await personsApi.get(`/artsakh/displacements/${ssn}`);
  return response.data;
};

export const getWpDataBySsn = async (ssn) => {
  const response = await personsApi.get(`/wp/${ssn}`);
  return response.data;
};

export const getBordercrossDataBySsn = async (data) => {
  const response = await personsApi.post(`/persons/bordercross`, data);
  return response.data;
};

export const getRoadpoliceDataBySsn = async (ssn) => {
  const response = await personsApi.get(`/persons/${ssn}/roadpolice`);
  return response.data;
};

export const getVehiclesByParams = async (q, searchBase) => {
  const response = await personsApi.get(
    `/persons/${q}/vehicle?searchBase=${searchBase}`
  );
  return response.data;
};

export const getTaxBySsn = async (ssn) => {
  const response = await personsApi.get(`/persons/${ssn}/tax`);
  return response.data;
};

export const getCompanyByHvhh = async (tax_id) => {
  const response = await personsApi.get(`/persons/${tax_id}/petregistr`);
  return response.data;
};

export const getCompanyForPersonByHvhh = async (tax_id) => {
  const response = await personsApi.get(`/persons/${tax_id}/petregistr`);
  return response.data;
};

export const getKadastrCertByNumber = async (q, searchBase) => {
  const response = await personsApi.get(
    `/kadastr/${q}/document?searchBase=${searchBase}`
  );
  return response.data;
};

export const getCompaniesBySsn = async (ssn) => {
  const response = await personsApi.get(`/petregistr/${ssn}/person`);
  return response.data;
};

export const getPoliceByPnum = async (pnum) => {
  const response = await personsApi.get(`/persons/${pnum}/police`);
  return response.data;
};

export const getFile = async ({ filterData }) => {
  const config = {
    responseType: "blob",
  };

  const { data } = await personsApi.post(
    "/export/excel",
    { data: filterData },
    config
  );

  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return blob;
};

export default personsApi;
