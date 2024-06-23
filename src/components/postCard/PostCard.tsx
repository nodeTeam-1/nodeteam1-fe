import React from 'react';
import PostImage from '../postImage/PostImage';
import './postCard.scss';

interface User {
    _id: string;
    name: string;
    profileImage: string;
}

interface Post {
    _id: string;
    userId: User;
    title: string;
    content: string;
    images: string[];
    category: string;
    tags: string[];
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
}

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className='post-card'>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.images.map((image, index) => (
                <PostImage key={index} src={image} alt={`Image ${index}`} />
            ))}
        </div>
    );
};

export default PostCard;
