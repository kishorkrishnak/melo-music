import axios from "axios";

const API_URL = process.env.REACT_APP_SPOTIFY_API_URL;

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, data, method }) => {
  try {
    const tokenResponse = await axios.get("http://localhost:5000/token");
    const accessToken = tokenResponse.data;
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    return { status: err.success, message: err.message };
  }
};
