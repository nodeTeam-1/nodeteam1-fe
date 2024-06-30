import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import ProfileImage from '../profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
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

interface PostCardContainerProps {
    posts: Post[];
}

const PostCardContainer: React.FC<PostCardContainerProps> = ({ posts }) => {
    const navigate = useNavigate();
    return (
        <div className='post-card-container'>
            {posts.map((post) => (
                <div className='post-card-wrap' key={post._id}>
                    <div className='user-head'>
                        <ProfileImage
                            userId={post.userId._id}
                            name={post.userId.name}
                            profileImageSrc={post.userId.profileImage}
                        />
                        <ul className='user-info'>
                            <li className='user-name'>{post.userId.name}</li>
                            <li className='user-post-date'>{new Date(post.createdAt).toLocaleDateString()}</li>
                        </ul>
                        <IoIosMore />
                    </div>
                    <PostCard post={post} onClick={() => navigate(`/feed/detail/${post._id}`, { state: { post } })} />
                </div>
            ))}
        </div>
    );
};

export default PostCardContainer;
