import React from 'react';
import GradientButton from './GradientButton';

const Header = ({ setRoute }) => {
    return (
        <header className="bg-slate-800/50 backdrop-blur-lg shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div
                    onClick={() => setRoute({ name: 'home', searchTerm: '', type: '', page: 1 })}
                    className="text-2xl font-extrabold text-white cursor-pointer flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    Prime<span className="text-cyan-400">Movies</span>
                </div>
                <GradientButton onClick={() => setRoute({ name: 'favorites' })} padding="px-5 py-2">
                    <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        My Favorites
                    </span>
                </GradientButton>
            </nav>
        </header>
    );
};

export default Header;