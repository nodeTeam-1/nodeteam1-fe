// NotFoundPage.tsx
import React from 'react';

interface NotFoundPageProps {
    message?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ message }) => {
    return (
        <div className='page-container error-page'>
            <img src='/404.png' alt='error-page' />
            <p>{message || 'The page you are looking for does not exist.'}</p>
        </div>
    );
};

export default NotFoundPage;
