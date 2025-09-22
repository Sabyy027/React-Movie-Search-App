import React from 'react';

const Spinner = () => (
    <div className="flex justify-center items-center h-full pt-10">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-cyan-500"></div>
    </div>
);

export default Spinner;