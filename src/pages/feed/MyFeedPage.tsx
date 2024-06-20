import React from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import PostCard from '../../components/post/PostCard';

const MyFeed: React.FC = () => {
    return (
        <div className='my-feed-page'>
            <ProfileCard />
            <PostCard />
        </div>
    );
}

export default MyFeed;
