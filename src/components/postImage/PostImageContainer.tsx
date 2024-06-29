import React from 'react';
import PostImage from './PostImage';
import './postImage.scss';

interface PostImageContainerProps {
    key: string;
    src: string;
    alt: string;
}

const PostImageContainer: React.FC<PostImageContainerProps> = ({ key, src, alt }) => {
    return (
        <div className='post-image-container' key={key}>
            <PostImage src={src} alt={alt} />
        </div>
    );
};

export default PostImageContainer;
