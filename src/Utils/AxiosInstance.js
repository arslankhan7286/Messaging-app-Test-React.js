import axios from "axios";

export const getApiInceptor = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const client = axios.create({
    baseURL: apiUrl,
  });

  client.interceptors.request.use(function (request) {
    const accessToken = localStorage.getItem("Token");
    if (!request.url.includes("/login")) {
      request.headers.common["Authorization"] = `Token ${accessToken}`;
    } else {
      return Promise.reject(new Error("Forbidden"));
    }
    return request;
  });

  return client;
};
