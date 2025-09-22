// --- Constants ---
const API_KEY = '40a44c87';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

/**
 * Fetches movies from the OMDB API based on a search query, page, and type.
 * @param {string} query - The search term.
 * @param {number} page - The page number for pagination.
 * @param {string} type - The type of media (movie, series, episode).
 * @returns {Promise<Object>} - A promise that resolves to the search results.
 */
export const fetchMovies = async (query, page, type) => {
    if (!query) return { Search: [], totalResults: 0 };
    try {
        const response = await fetch(`${API_URL}&s=${query}&page=${page}&type=${type}`);
        const data = await response.json();
        if (data.Response === "True") {
            return {
                movies: data.Search,
                totalResults: parseInt(data.totalResults, 10),
            };
        } else {
            return { movies: [], totalResults: 0, error: data.Error };
        }
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return { movies: [], totalResults: 0, error: "Failed to fetch movies. Check your connection." };
    }
};

/**
 * Fetches detailed information for a specific movie by its IMDb ID.
 * @param {string} imdbID - The IMDb ID of the movie.
 * @returns {Promise<Object>} - A promise that resolves to the movie details.
 */
export const fetchMovieDetails = async (imdbID) => {
    try {
        const response = await fetch(`${API_URL}&i=${imdbID}&plot=full`);
        const data = await response.json();
        if (data.Response === "True") {
            return data;
        } else {
            return { error: data.Error };
        }
    } catch (error) {
        console.error("Failed to fetch movie details:", error);
        return { error: "Failed to fetch details. Check your connection." };
    }
};