import React from 'react';
import PostImage from './PostImage';
import './postImage.scss';

const PostImageContainer: React.FC = () => {
    return (
        <div className='post-image-container'>
            <PostImage />
        </div>
    );
};

export default PostImageContainer;