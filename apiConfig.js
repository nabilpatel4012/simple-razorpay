const { C2M } = require("./src/config/config");
const axios = require("axios");
const { Buffer } = require("buffer");
const https = require("https");

const API_BASE_URL = C2M.C2MBaseUrl;

const API_ENDPOINTS = {
  getViewBillInfo: `${API_BASE_URL}/BillInfo/getViewBillInfo`,
};

const API_AUTHORIZATION_HEADER = {
  Authorization: `Basic ${Buffer.from(
    `${C2M.C2MUser}:${C2M.C2MPassword}`
  ).toString("base64")}`,
};

const axiosCall = async (request, url) => {
  try {
    const response = await axios({
      url: url,
      method: "POST",
      headers: API_AUTHORIZATION_HEADER,
      data: request,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  axiosCall,
  API_ENDPOINTS,
  API_BASE_URL,
  API_AUTHORIZATION_HEADER,
};
