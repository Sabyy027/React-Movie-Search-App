import React, { useState } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
    // This state object simulates a basic router.
    const [route, setRoute] = useState({ name: 'home', searchTerm: '', type: '', page: 1 });

    const renderPage = () => {
        switch (route.name) {
            case 'details':
                return <MovieDetailPage imdbID={route.imdbID} setRoute={setRoute} prevRoute={route} />;
            case 'favorites':
                return <FavoritesPage setRoute={setRoute} />;
            case 'home':
            default:
                return <HomePage setRoute={setRoute} route={route} />;
        }
    };

    return (
        <FavoritesProvider>
            <div className="bg-slate-900 min-h-screen font-sans text-slate-300">
                <Header setRoute={setRoute} />
                <main>
                    {renderPage()}
                </main>
            </div>
        </FavoritesProvider>
    );
}

export default App;