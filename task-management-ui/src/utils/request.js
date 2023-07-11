import axios from "axios";

export const getRequest = async (url, headers = {}, data) => {
  try {
    const response = await axios.get(url, { headers });
    return await response.data;
  } catch (e) {
    if (
      e.response.status === 500 ||
      e.response.status === 404 ||
      e.response.status === 401 ||
      e.response.status === 403
    ) {
      const msg = `Got 500 from ui service GET ${url} call`;
      console.error(msg, e);
      return {
        hasException: true,
        errorMessage: "No error data received",
        ...(e?.response?.data ? { ...e?.response?.data } : {}),
      };
    }
  }
};

export const postRequest = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, { headers });
    return await response.data;
  } catch (e) {
    if (e.response.status === 500) {
      const msg = `Got 500 from ui service after POST ${url} call`;
      // eslint-disable-next-line no-console
      console.error(msg, e);
      return {
        hasException: true,
        errorMessage: "No error data received",
        ...(e?.response?.data ? { ...e?.response?.data } : {}),
      };
    }
    return {
      hasException: true,
      errorMessage: "Error while processing your request. Please try again",
      ...(e?.response?.data ? { ...e?.response?.data } : {}),
    };
  }
};

export const putRequest = async (url, data, headers = {}) => {
  try {
    const response = await axios.put(url, data, { headers });
    return await response.data;
  } catch (e) {
    if (e.response.status === 500) {
      const msg = `Got 500 from ui service after POST ${url} call`;
      // eslint-disable-next-line no-console
      console.error(msg, e);
      return {
        hasException: true,
        errorMessage: "No error data received",
        ...(e?.response?.data ? { ...e?.response?.data } : {}),
      };
    }
    return {
      hasException: true,
      errorMessage: "Error while processing your request. Please try again",
      ...(e?.response?.data ? { ...e?.response?.data } : {}),
    };
  }
};

export const deleteRequest = async (url, data, headers = {}) => {
  try {
    const response = await axios.delete(`${url}/${data.id}`, { headers });
    return await response.data;
  } catch (e) {
    if (e.response.status === 500) {
      const msg = `Got 500 from ui service after POST ${url} call`;
      // eslint-disable-next-line no-console
      console.error(msg, e);
      return {
        hasException: true,
        errorMessage: "No error data received",
        ...(e?.response?.data ? { ...e?.response?.data } : {}),
      };
    }
    return {
      hasException: true,
      errorMessage: "Error while processing your request. Please try again",
      ...(e?.response?.data ? { ...e?.response?.data } : {}),
    };
  }
};
