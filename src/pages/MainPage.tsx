import React from 'react';
import PostCardContainer from '../components/post/PostCardContainer';
import './MainPage.scss';

const MainPage: React.FC = () => {
    return (
        <div className='main-page'>
            <PostCardContainer />
        </div>
    );
};

export default MainPage;
