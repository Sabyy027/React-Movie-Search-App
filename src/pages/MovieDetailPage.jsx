import React, { useState, useEffect, useContext } from 'react';
import { fetchMovieDetails } from '../services/omdbApi';
import { FavoritesContext } from '../context/FavoritesContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import GradientButton from '../components/GradientButton';

const MovieDetailPage = ({ imdbID, setRoute, prevRoute }) => {
    // Accept prevRoute as prop for back navigation
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    const isFavorite = favorites.some(fav => fav.imdbID === imdbID);

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);
            const details = await fetchMovieDetails(imdbID);
            if (details.error) {
                setError(details.error);
            } else {
                setMovie(details);
            }
            setLoading(false);
        };
        getDetails();
    }, [imdbID]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!movie) return null;

    const poster = movie.Poster === "N/A" ? "https://placehold.co/500x750/0f172a/94a3b8?text=No+Image" : movie.Poster;

    const handleBack = () => {
        if (typeof prevRoute === 'object' && prevRoute.searchTerm) {
            setRoute({ name: 'home', searchTerm: prevRoute.searchTerm, type: prevRoute.type, page: prevRoute.page });
        } else {
            setRoute({ name: 'home' });
        }
    };
    return (
        <div className="container mx-auto px-4 py-12">
            <GradientButton onClick={handleBack} padding="px-4 py-2" className="mb-8">
                <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Search
                </span>
            </GradientButton>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="md:w-1/3">
                    <img src={poster} alt={movie.Title} className="rounded-lg w-full shadow-2xl shadow-slate-900/80" />
                </div>
                <div className="md:w-2/3 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-cyan-400">{movie.Title}</h1>
                    <div className="flex items-center space-x-4 text-slate-400 mb-4">
                        <span>{movie.Year}</span>
                        <span>•</span>
                        <span>{movie.Rated}</span>
                        <span>•</span>
                        <span>{movie.Runtime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {movie.Genre.split(', ').map(g => <span key={g} className="bg-slate-700 text-slate-300 px-3 py-1 text-sm rounded-full">{g}</span>)}
                    </div>
                    <p className="text-lg mb-6 leading-relaxed">{movie.Plot}</p>

                    <button onClick={handleFavoriteClick} className="p-[3px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
                        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                            <span className="flex items-center gap-3">
                                {isFavorite ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                                        Remove from Favorites
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                                        Add to Favorites
                                    </>
                                )}
                            </span>
                        </div>
                    </button>

                    <div className="mt-8 pt-6 border-t border-slate-700">
                        <h3 className="text-2xl font-bold mb-4">Details</h3>
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Writer:</strong> {movie.Writer}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                        <p><strong>Language:</strong> {movie.Language}</p>
                        <p><strong>Country:</strong> {movie.Country}</p>
                        <p><strong>Awards:</strong> {movie.Awards}</p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold mb-4">Ratings</h3>
                        <div className="flex flex-col gap-3">
                            {movie.Ratings.map(rating => {
                                let logo = null;
                                let style = '';
                                if (rating.Source === 'Internet Movie Database') {
                                    logo = <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" className="h-6 w-auto mr-2" />;
                                    style = 'bg-yellow-400 text-black font-bold';
                                } else if (rating.Source === 'Rotten Tomatoes') {
                                    logo = <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg" alt="Rotten Tomatoes" className="h-6 w-auto mr-2" />;
                                    style = 'bg-red-600 text-white font-bold';
                                } else if (rating.Source === 'Metacritic') {
                                    logo = <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg" alt="Metacritic" className="h-6 w-auto mr-2" />;
                                    style = 'bg-green-700 text-white font-bold';
                                } else {
                                    style = 'bg-slate-800 text-white';
                                }
                                return (
                                    <div key={rating.Source} className={`flex items-center p-3 rounded-lg ${style}`} style={{backgroundColor: style.includes('bg-slate-800') ? '' : undefined}}>
                                        {logo}
                                        <span className="font-semibold mr-2">{rating.Source}:</span>
                                        <span>{rating.Value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;