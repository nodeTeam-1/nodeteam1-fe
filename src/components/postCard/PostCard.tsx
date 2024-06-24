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
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className='post-images'>
                {post.images.split(',').map((image, index) => (
                    <PostImage key={index} src={image.trim()} alt={`Image ${index}`} />
                ))}
            </div>
            <div className='post-meta'>
                <span className='post-category'>{post.category}</span>
                <span className='post-tags'>
                    {post.tags.map((tag, index) => (
                        <span key={index} className='post-tag'>
                            {tag}
                        </span>
                    ))}
                </span>
                <span className='post-like-count'>{post.likeCount} likes</span>
                <span className='post-date'>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default PostCard;
