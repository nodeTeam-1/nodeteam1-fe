import React from 'react';
import PostImage from '../postImage/PostImage';
import PostContent from './PostContent';
import './post.scss';

const PostCard: React.FC = () => {
    return (
        <div className='post-card'>
            <PostImage />
            <PostContent />
        </div>
    );
};

export default PostCard;
