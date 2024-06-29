import React from 'react';
import './postImage.scss';

interface PostImageProps {
    key: string;
    src: string;
    alt: string;
    onClick?: () => void;
}

const PostImage: React.FC<PostImageProps> = ({ key, src, alt, onClick }) => {
    return (
        <div className='post-image' key={key} onClick={onClick}>
            <img src={src} alt={alt} />
        </div>
    );
};

export default PostImage;
