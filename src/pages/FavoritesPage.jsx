import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import GradientButton from '../components/GradientButton';

const FavoritesPage = ({ setRoute }) => {
    const { favorites } = useContext(FavoritesContext);

    const handleMovieSelect = (imdbID) => {
        setRoute({ name: 'details', imdbID });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-white mb-8">My Favorites</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {favorites.map(movie => (
                        <MovieCard key={movie.imdbID} movie={movie} onMovieSelect={handleMovieSelect} isFavorite={true} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl text-slate-400">You haven't added any favorites yet.</p>
                    <GradientButton onClick={() => setRoute({ name: 'home' })} className="mt-6">
                        Find Movies
                    </GradientButton>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;