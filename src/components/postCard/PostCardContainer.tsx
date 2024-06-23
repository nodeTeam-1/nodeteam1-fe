import React from 'react';
import PostCard from './PostCard';
import ProfileImage from '../profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
import { usePostsQuery } from '../../hooks/usePostsQuery';
import './postCard.scss';

const PostCardContainer: React.FC = () => {
    const { data, isLoading, isError } = usePostsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading posts</div>;
    }

    return (
        <div className='post-card-container'>
            {data?.data.map((post) => (
                <div key={post._id} className='post-card'>
                    <div className='post-action'>
                        <ProfileImage userId={post.userId._id} />
                        <ul className='post-info'>
                            <li className='post-id'>{post.userId.name}</li>
                            <li className='post-date'>{new Date(post.createdAt).toLocaleDateString()}</li>
                            <li className='post-location'>{post.location}</li>
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
