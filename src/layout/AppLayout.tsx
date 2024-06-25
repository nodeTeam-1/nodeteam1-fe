import React, { ReactNode, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';

import { useUserStore } from '../store/userStore';
import { tokenLoginQuery } from '../hooks/useLoginHook';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { setUser } = useUserStore();
    //token으로 로그인 시도
    const { data, isLoading } = tokenLoginQuery('/user/info');

    useEffect(() => {
        if (!isLoading && data) {
            setUser(data?.data.user.name);
        }
    }, [isLoading, data]);

    return (
        <>
            <ToastMessage />
            {children}
            <Navbar />
        </>
    );
};

export default AppLayout;
