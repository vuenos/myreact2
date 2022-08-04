import apiClient from "../service/Api";

export const getMovies = async () => {
    const { data } = await apiClient.get(`/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&page=${page}&with_genres=${genreforURL}`);
    return data.result.data;
}