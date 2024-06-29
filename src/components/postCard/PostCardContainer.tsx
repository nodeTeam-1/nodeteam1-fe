import React from 'react';
import PostCard from './PostCard';
import ProfileImage from '../profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
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

interface PostCardContainerProps {
    posts: Post[];
}

const PostCardContainer: React.FC<PostCardContainerProps> = ({ posts }) => {
    return (
        <div className='post-card-container'>
            {posts.map((post) => (
                <div className='post-card-wrap' key={post._id}>
                    <div className='post-head'>
                        <ProfileImage userId={post.userId._id} />
                        <ul className='post-info'>
                            <li className='post-id'>{post.userId.name}</li>
                            <li className='post-date'>{new Date(post.createdAt).toLocaleDateString()}</li>
                            {/* <li className='post-location'>{post.location}</li> */}
                        </ul>
                        <IoIosMore />
                    </div>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
};

export default PostCardContainer;
