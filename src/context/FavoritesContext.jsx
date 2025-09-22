import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    // State for favorite movies, initialized from localStorage
    const [favorites, setFavorites] = useState(() => {
        try {
            const localData = localStorage.getItem('movie-favorites');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Could not parse favorites from localStorage", error);
            return [];
        }
    });

    // Effect to update localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('movie-favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
            setFavorites(prev => [...prev, movie]);
        }
    };

    const removeFavorite = (imdbID) => {
        setFavorites(prev => prev.filter(movie => movie.imdbID !== imdbID));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};