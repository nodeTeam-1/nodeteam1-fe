import React from 'react';
import './postImage.scss';

interface PostImageProps {
    key: string;
    src: string;
    alt: string;
}

const PostImage: React.FC<PostImageProps> = ({ key, src, alt }) => {
    return (
        <div className='post-image' key={key}>
            <img src={src} alt={alt} />
        </div>
    );
};

export default PostImage;
