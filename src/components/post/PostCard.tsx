import React from 'react';
import PostImage from './PostImage';
import PostContent from './PostContent';

const PostCard: React.FC = () => {
    return (
        <div className='post-card'>
            <PostImage />
            <PostContent />
        </div>
    );
};

export default PostCard;
