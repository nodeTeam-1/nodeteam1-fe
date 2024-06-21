import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/user/LoginPage';
import RegisterPage from '../../pages/user/RegisterPage';
import MyFeedPage from '../../pages/feed/MyFeedPage';
import FeedDetailPage from '../../pages/feed/FeedDetailPage';
import MainPage from '../../pages/MainPage';

const MainRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/feed/:id' element={<MyFeedPage />} />
            <Route path='/feed/:id/:id' element={<FeedDetailPage />} />
            <Route path='/user/login' element={<LoginPage />} />
            <Route path='/user/register' element={<RegisterPage />} />
        </Routes>
    );
};
export default MainRoutes;
