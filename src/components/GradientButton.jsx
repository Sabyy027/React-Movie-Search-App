import React from 'react';

const GradientButton = ({ children, onClick, disabled, className = '', padding = 'px-8 py-2' }) => (
    <button onClick={onClick} disabled={disabled} className={`p-[3px] relative ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
        <div className={`${padding} bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent`}>
            {children}
        </div>
    </button>
);

export default GradientButton;