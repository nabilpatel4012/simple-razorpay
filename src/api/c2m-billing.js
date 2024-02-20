const { axiosCall, API_ENDPOINTS } = require("../../apiConfig");

const fetchAndViewBillInfo = async (acctId) => {
  try {
    const request = { acctId: acctId };
    const url = API_ENDPOINTS.getViewBillInfo;
    const response = await axiosCall(request, url);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
};

module.exports = {
  fetchAndViewBillInfo,
};
