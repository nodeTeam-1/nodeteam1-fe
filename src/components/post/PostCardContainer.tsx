import React from 'react';
import PostCard from './PostCard';
import './post.scss';

const PostCardontainer: React.FC = () => {
    return (
        <div className='post-card-container'>
            <PostCard />
        </div>
    );
};

export default PostCardontainer;
