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
    lastPostElementRef: (node: HTMLElement | null) => void;
}

const PostImageContainer: React.FC<PostImageContainerProps> = ({ posts, lastPostElementRef }) => {
    const navigate = useNavigate();

    return (
        <div className='post-image-container'>
            {posts.map((post, index) => (
                <PostImage
                    ref={index === posts.length - 1 ? lastPostElementRef : null}
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
