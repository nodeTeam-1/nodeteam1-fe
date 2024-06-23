import React from 'react';
import PostImage from '../postImage/PostImage';
import './postCard.scss';

interface PostCardProps {
    post: {
        title: string;
        content: string;
        images: string[];
    };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className='post-card'>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.images.map((_image, index) => (
                <PostImage key={index} src={''} alt={''} />
            ))}
        </div>
    );
};

export default PostCard;
