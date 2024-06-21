import React from 'react';
import PostImage from '../postImage/PostImage';
import './postCard.scss';

const PostCard: React.FC = () => {
    return (
        <div className='post-card'>
            <PostImage />
            <div className='post-card'></div>
        </div>
    );
};

export default PostCard;
