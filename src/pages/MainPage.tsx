import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCardContainer from '../components/postCard/PostCardContainer';
import './MainPage.scss';

import { useUserStore } from '../store/userStore';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    /* 
    User가 로그인 되어있다면
        있다면 메인페이지 바로 이용가능.
        없다면 로그인 페이지로 강제 이동.
    */
    useEffect(() => {
        if (!user) {
            console.log('navigate /user/login');
            navigate('/user/login');
        }
    }, [user]);
    return (
        <div className='main-page'>
            <PostCardContainer />
        </div>
    );
};

export default MainPage;
