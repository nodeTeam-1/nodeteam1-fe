import React from 'react';
import PostImage from '../postImage/PostImage';
import PostCardAction from './PostCardAction';
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
    images: string;
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
            <PostImage src={post.images} alt={`${post.images}`} />
            <PostCardAction likeCount={post.likeCount} />
            <div className='post-contents'>
                <p className='post-title'>{post.title}</p>
                <p className='post-content'>{post.content}</p>
                <ul className='post-tags'>
                    {post.tags.map((tag, index) => (
                        <li key={index} className='post-tag'>
                            #{tag}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostCard;
