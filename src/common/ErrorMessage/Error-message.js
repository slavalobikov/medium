import React from 'react';

const ErrorMessage = ( {backendErrors}) => {

    const errorMessages = Object.keys(backendErrors).map(name => {
        const messages = backendErrors[name].join(' ');
        return `${name} ${messages}`
    });

    return <div>
        {errorMessages.map(errorMessages => (
            <div key={errorMessages}> {errorMessages}</div>
        ))}
    </div>
};

export default ErrorMessage;