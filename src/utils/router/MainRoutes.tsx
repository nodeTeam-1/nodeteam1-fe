import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/user/LoginPage';
import RegisterPage from '../../pages/user/RegisterPage';
import FeedPage from '../../pages/feed/FeedPage';
import FeedDetailPage from '../../pages/feed/FeedDetailPage';
import MainPage from '../../pages/MainPage';
import { DmPage } from '../../pages/dm/DmPage';
import FollowListPage from '../../pages/follow/FollowListPage';

const MainRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/feed/detail/:id' element={<FeedDetailPage />} />
            <Route path='/feed/:id' element={<FeedPage />} />
            <Route path='/user/login' element={<LoginPage />} />
            <Route path='/user/register' element={<RegisterPage />} />
            <Route path='/follow' element={<FollowListPage />} />
            <Route path='/dm/:id' element={<DmPage />} />
        </Routes>
    );
};
export default MainRoutes;
