import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchCrimeDataByDistrict = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crime-count-by-district`);
    const rawData = response.data;

    const labels = rawData.map((item) => item.district);
    const values = rawData.map((item) => item.count);

    return {
      chartData: { labels, values },
      tableData: rawData,
    };
  } catch (error) {
    console.error("Error fetching crime data by district:", error);
    return {
      chartData: { labels: [], values: [] },
      tableData: [],
    };
  }
};

export const fetchCrimeDataByAgeGroup = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/crime-count-by-age-group`
    );
    const rawData = response.data;

    const labels = rawData.map((item) => item.age_group);
    const values = rawData.map((item) => item.count);

    return {
      chartData: { labels, values },
      tableData: rawData,
    };
  } catch (error) {
    console.error("Error fetching crime data by age group:", error);
    return {
      chartData: { labels: [], values: [] },
      tableData: [],
    };
  }
};

export const fetchTotalCrimes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/total-crime-incidents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total crime incidents:", error);
    return { total: 0 };
  }
};

export const fetchMonthlyCrimes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/monthly-crime-incidents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly crime incidents:", error);
    return { total: 0 };
  }
};

export const fetchCrimeDataByType = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crime-count-by-type`);
    const rawData = response.data;

    const labels = rawData.map((item) => item.crime);
    const values = rawData.map((item) => item.count);

    return {
      chartData: { labels, values },
      tableData: rawData,
    };
  } catch (error) {
    console.error("Error fetching crime data by type:", error);
    return {
      chartData: { labels: [], values: [] },
      tableData: [],
    };
  }
};

export const fetchCrimeDataByTransport = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/crime-count-by-transport`
    );
    const rawData = response.data;

    const labels = rawData.map((item) => item.transport_mode);
    const values = rawData.map((item) => item.count);

    return {
      chartData: { labels, values },
      tableData: rawData,
    };
  } catch (error) {
    console.error("Error fetching crime data by transport:", error);
    return {
      chartData: { labels: [], values: [] },
      tableData: [],
    };
  }
};

export const fetchOverallCrimeRate = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/overall-crime-rate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching overall crime rate:", error);
    return { crime_rate: 0 };
  }
};
