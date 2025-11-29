import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Use API Key from .env
const BASE_URL = "https://api.themoviedb.org/3";

// Function to fetch trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
