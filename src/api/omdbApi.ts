import axios from "axios"; // ✅ CORRECT
import { MovieDetailResponse, MovieSearchResult, SearchParams } from "./types";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

const omdbApi = {
  searchMovies: async (params: SearchParams): Promise<MovieSearchResult> => {
    try {
      const response = await axios.get<MovieSearchResult>(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: params.s, // Search term
          type: params.type || undefined, // movie, series, episode
          y: params.y || undefined, // Year
          page: params.page, // Page number (1-100)
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  },

  getMovieDetails: async (imdbID: string): Promise<MovieDetailResponse> => {
    try {
      const response = await axios.get<MovieDetailResponse>(BASE_URL, {
        params: {
          apikey: API_KEY,
          i: imdbID, // IMDb ID
          plot: "full", // Return full plot
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  },

  getMovieByTitle: async (title: string): Promise<MovieDetailResponse> => {
    try {
      const response = await axios.get<MovieDetailResponse>(BASE_URL, {
        params: {
          apikey: API_KEY,
          t: title,
          plot: "full",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching movie by title:", error);
      throw error;
    }
  },
};

export default omdbApi;
