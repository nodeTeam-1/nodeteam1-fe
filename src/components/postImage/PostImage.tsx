import React from 'react';
import './postImage.scss';

interface PostImageProps {
    src: string;
    alt: string;
}

const PostImage: React.FC<PostImageProps> = ({ src, alt }) => {
    return (
        <div className='post-image'>
            <img src={src} alt={alt} />
        </div>
    );
};

export default PostImage;
