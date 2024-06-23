import React from 'react';
import PostCard from './PostCard';
import ProfileImage from '../profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
import { useGetPosts } from './../../hooks/usePostHook';
import './postCard.scss';

import { AxiosResponse } from 'axios';

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

const PostCardContainer: React.FC = () => {
    const { data, isLoading, isError } = useGetPosts();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return <div>Error loading posts</div>;
    }

    return (
        <div className='post-card-container'>
            {data.data.map((post: AxiosResponse<Post[]>['data'][0]) => (
                <div key={post._id} className='post-card'>
                    <div className='post-action'>
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
