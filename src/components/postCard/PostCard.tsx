import React from 'react';
import PostImage from '../postImage/PostImage';
import PostCardAction from './PostCardAction';
import './postCard.scss';

interface User {
    _id: string;
    name: string;
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
    onClick?: () => void; // Optional onClick prop
    refetch?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, refetch }) => {
    return (
        <div className='post-card'>
            <PostImage key={post.title} src={post.images} alt='PostImage' />
            <PostCardAction
                likeCount={post.likeCount}
                postId={post._id}
                postUserId={post.userId._id}
                onClick={onClick}
                refetch={refetch}
            />
            <div className='post-contents'>
                <p className='post-title'>{post.title}</p>
                <p className='post-content' onClick={onClick}>
                    {post.content}
                </p>
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
