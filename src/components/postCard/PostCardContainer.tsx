import React from 'react';
import PostCard from './PostCard';
import ProfileImage from '../profile/ProfileImage';
import { IoIosMore } from 'react-icons/io';
import './postCard.scss';

const PostCardontainer: React.FC = () => {
    return (
        <div className='post-card-container'>
            <div className='post-action'>
                <ProfileImage />
                <ul className='post-info'>
                    <li className='post-id'>아이디</li>
                    <li className='post-date'>날짜</li>
                    <li className='post-location'>위치</li>
                </ul>
                <IoIosMore />
            </div>
            <PostCard />
        </div>
    );
};

export default PostCardontainer;
