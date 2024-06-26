import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCardContainer from '../components/postCard/PostCardContainer';
import { getPostsQuery } from './../hooks/usePostHook';
import './MainPage.scss';

import { useUserStore } from '../store/userStore';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useUserStore();
    const { data, isLoading, isError } = getPostsQuery(1, '', 10); // 기본값으로 사용
    console.log('getPostsQuery data', data?.data.data);

    useEffect(() => {
        if (!userId) {
            console.log('navigate /user/login');
            navigate('/user/login');
        }
    }, [userId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data?.data.data) {
        return <div>Error loading posts</div>;
    }

    if (data.data.data.length === 0) {
        return <div>No posts available</div>;
    }

    return (
        <div className='main-page'>
            <PostCardContainer posts={data.data.data} />
        </div>
    );
};

export default MainPage;
