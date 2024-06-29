import React from 'react';
import PostImage from './PostImage';
import './postImage.scss';

interface User {
    _id: string;
    name: string;
    profileImage: string;
}

export interface PostData {
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

interface PostImageContainerProps {
    posts: PostData[];
}

const PostImageContainer: React.FC<PostImageContainerProps> = ({ posts }) => {
    return (
        <div className='post-image-container'>
            {posts.map((post) => (
                <PostImage key={post._id} src={post.images} alt={post.title} />
            ))}
        </div>
    );
};

export default PostImageContainer;
