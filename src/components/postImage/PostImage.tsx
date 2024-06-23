import React from 'react';
import './postImage.scss';

interface PostImageProps {
    src: string;
    alt: string;
}

const PostImage: React.FC<PostImageProps> = ({ src, alt }) => {
    return <img className='post-image' src={src} alt={alt} />;
};

export default PostImage;
