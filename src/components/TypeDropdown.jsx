import React, { useState, useRef } from 'react';

const TypeDropdown = ({ selectedType, onTypeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timerRef = useRef(null);
    const containerRef = useRef(null);

    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // delay before closing
    };

    const handleTypeSelect = (type) => {
        onTypeChange(type);
        setIsOpen(false);
    };

    const types = [
        { value: '', label: 'All' },
        { value: 'movie', label: 'Movies' },
        { value: 'series', label: 'Series' }
    ];

    const currentLabel = types.find(t => t.value === selectedType)?.label || 'All';

    return (
        <div
            className="relative"
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
                <div className="px-5 py-2.5 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent w-44 text-center inline-flex items-center justify-center">
                    {currentLabel}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="z-10 absolute top-full mt-2 bg-slate-700 divide-y divide-slate-600 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-200">
                        {types.map(type => (
                            <li key={type.value}>
                                <button
                                    onClick={() => handleTypeSelect(type.value)}
                                    className="block w-full text-left px-4 py-2 hover:bg-slate-600 hover:text-white"
                                >
                                    {type.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TypeDropdown;