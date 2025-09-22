import React from 'react';

const MovieCard = ({ movie, onMovieSelect, isFavorite }) => {
    const poster = movie.Poster === "N/A" ? "https://placehold.co/300x450/0f172a/94a3b8?text=No+Image" : movie.Poster;
    return (
        <div
            className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            onClick={() => onMovieSelect(movie.imdbID)}
        >
            <div className="relative">
                <img src={poster} alt={`${movie.Title} Poster`} className="w-full h-auto object-cover" />
                {isFavorite && (
                    <div className="absolute top-2 left-2 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-white truncate group-hover:text-cyan-400">{movie.Title}</h3>
                <p className="text-sm text-slate-400">{movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;