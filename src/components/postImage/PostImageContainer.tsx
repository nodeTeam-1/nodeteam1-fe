import React from 'react';
import PostImage from './PostImage';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    return (
        <div className='post-image-container'>
            {posts.map((post) => (
                <PostImage
                    key={post._id}
                    src={post.images}
                    alt={post.title}
                    onClick={() => navigate(`/feed/detail/${post._id}`, { state: { post } })}
                />
            ))}
        </div>
    );
};

export default PostImageContainer;
