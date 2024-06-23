import React from 'react';
import PostCard from './PostCard';
import ProfileImage from '../profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
import { useGetPosts } from './../../hooks/usePostHook';
import './postCard.scss';

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
            {data.data.map((post: any) => (
                <div key={post._id} className='post-card'>
                    <div className='post-action'>
                        <ProfileImage userId={post.userId._id} />
                        <ul className='post-info'>
                            <li className='post-id'>{post.userId.name}</li>
                            <li className='post-date'>날짜</li>
                            <li className='post-location'>위치</li>
                            {/* <li className='post-date'>{new Date(post.createdAt).toLocaleDateString()}</li> */}
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
