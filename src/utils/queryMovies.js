import api from "../axios/api";

export const getMoviesOrSeries = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
