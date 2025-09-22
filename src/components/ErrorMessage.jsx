import React from 'react';

const ErrorMessage = ({ message }) => (
    <div className="text-center py-10 px-4">
        <p className="text-xl text-red-400 bg-red-900/20 p-4 rounded-lg">{message}</p>
    </div>
);

export default ErrorMessage;