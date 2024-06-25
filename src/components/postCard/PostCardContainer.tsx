import React from 'react';
import PostCard from './PostCard';
import ProfileImage from '../profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
import { getPostsQuery } from './../../hooks/usePostHook';
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

const PostCardContainer: React.FC = () => {
    const { data, isLoading, isError } = getPostsQuery(1, '', 10); // 기본값으로 사용

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data?.data?.data) {
        return <div>Error loading posts</div>;
    }

    if (data.data.data.length === 0) {
        return <div>No posts available</div>;
    }

    return (
        <div className='post-card-container'>
            {data.data.data.map((post: Post) => (
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
