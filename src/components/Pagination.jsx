import React from 'react';
import GradientButton from './GradientButton';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <nav className="flex justify-center items-center space-x-2 my-8">
            <GradientButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                padding="px-4 py-2"
            >
                Prev
            </GradientButton>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`p-[3px] relative rounded-lg ${currentPage === number ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : ''}`}
                >
                    <div className="px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                        {number}
                    </div>
                </button>
            ))}

            <GradientButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                padding="px-4 py-2"
            >
                Next
            </GradientButton>
        </nav>
    );
};

export default Pagination;