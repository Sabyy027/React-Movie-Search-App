import React, { useState, useEffect, useCallback, useContext } from 'react';
import { fetchMovies } from '../services/omdbApi';
import { FavoritesContext } from '../context/FavoritesContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import TypeDropdown from '../components/TypeDropdown';
import ReelLogo from '../components/ReelLogo';

const HomePage = ({ setRoute, route }) => {
    const [searchTerm, setSearchTerm] = useState(route?.searchTerm || '');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(route?.page || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [type, setType] = useState(route?.type || ''); // '', 'movie', 'series', 'episode'
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(route?.searchTerm || '');
    const { favorites } = useContext(FavoritesContext);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1); // Reset to page 1 on new search
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleSearch = useCallback(async () => {
        if (!debouncedSearchTerm) {
            setMovies([]);
            setTotalPages(0);
            setError('');
            return;
        }

        setLoading(true);
        setError('');
        const results = await fetchMovies(debouncedSearchTerm, currentPage, type);

        if (results.error) {
            setError(results.error);
            setMovies([]);
            setTotalPages(0);
        } else {
            setMovies(results.movies);
            setTotalPages(Math.ceil(results.totalResults / 10));
        }
        setLoading(false);
    }, [debouncedSearchTerm, currentPage, type]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const handleMovieSelect = (imdbID) => {
        setRoute(prev => ({
            name: 'details',
            imdbID,
            searchTerm,
            type,
            page: currentPage
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:flex-grow">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a movie, series, or episode..."
                        className="w-full bg-slate-800 text-white placeholder-slate-400 pl-5 pr-10 py-3 rounded-full border-2 border-transparent focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                            aria-label="Clear search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                <TypeDropdown selectedType={type} onTypeChange={setType} />
            </div>

            {loading ? <Spinner /> :
                error ? <ErrorMessage message={error} /> :
                    movies.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {movies.map(movie => {
                                    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
                                    return <MovieCard key={movie.imdbID} movie={movie} onMovieSelect={handleMovieSelect} isFavorite={isFavorite} />
                                })}
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </>
                    ) : debouncedSearchTerm ? (
                        <ErrorMessage message="No results found." />
                    ) : (
                        <div className="text-center py-10">
                            <h2 className="text-4xl font-bold text-white mb-4">Welcome to PrimeMovies</h2>
                            <p className="text-lg text-slate-400 mb-8">Find your next favorite movie, series, or episode.</p>
                            <ReelLogo />
                        </div>
                    )
            }
        </div>
    );
};

export default HomePage;