import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <>
            <ToastMessage />
            {children}
            <Navbar />
        </>
    );
};

export default AppLayout;
