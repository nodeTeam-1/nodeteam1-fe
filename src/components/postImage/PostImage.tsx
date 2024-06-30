import React, { forwardRef } from 'react';
import './postImage.scss';

interface PostImageProps {
    src: string;
    alt: string;
    onClick?: () => void;
}

const PostImage = forwardRef<HTMLDivElement, PostImageProps>(({ src, alt, onClick }, ref) => (
    <div className='post-image' onClick={onClick} ref={ref}>
        <img src={src} alt={alt} />
    </div>
));

PostImage.displayName = 'PostImage';

export default PostImage;
