import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/user/LoginPage';
import RegisterPage from '../../pages/user/RegisterPage';
import MyFeed from '../../pages/feed/MyFeedPage';
import MainPage from '../../pages/MainPage';
import PrivateRoute from './PrivateRoute';

const MainRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/feed/:id' element={<MyFeed />} />
            <Route path='/user/login' element={<LoginPage />} />
            <Route path='/user/register' element={<RegisterPage />} />
        </Routes>
    );
}

export default MainRoutes;
