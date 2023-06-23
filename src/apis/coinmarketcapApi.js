import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.coinlore.net/api/tickers",
});

export const apiV2 = axios.create({
  baseURL: "https://api.coinlore.net/api/ticker"
})

export const getData = async (start = 0, options = {}) => {
  const response = await api.get(`/?start=${start}&limit=10`, options);
  return response.data;
};

export const getEachData = async (ids) => {
  const response = await apiV2.get(`/?id=${ids}`)
  return response.data;
}
