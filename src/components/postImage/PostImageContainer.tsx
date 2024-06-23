import React from 'react';
import PostImage from './PostImage';
import './postImage.scss';

interface PostImageContainerProps {
    src: string;
    alt: string;
}

const PostImageContainer: React.FC<PostImageContainerProps> = ({ src, alt }) => {
    return (
        <div className='post-image-container'>
            <PostImage src={src} alt={alt} />
        </div>
    );
};

export default PostImageContainer;
