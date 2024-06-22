import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCardContainer from '../components/postCard/PostCardContainer';
import './MainPage.scss';

import { useUserStore } from '../store/userStore';
import { tokenLoginQuery } from '../hooks/loginHook';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    //token으로 로그인 시도
    const { data, isLoading } = tokenLoginQuery('/user/info');
    const { user, setUser } = useUserStore();

    /* 
    token 로그인 시도시
        성공한다면 메인페이지 바로 이용가능.
        실패한다면 로그인 페이지로 강제 이동.
    */
    useEffect(() => {
        if (data) {
            setUser(data?.data.user.name);
        } else if (!isLoading && !user) navigate('/user/login');
    }, [user, data, isLoading]);
    return (
        <div className='main-page'>
            <PostCardContainer />
        </div>
    );
};

export default MainPage;
