/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ICommentData } from './comment.type';
import './comment.scss';

interface CommentCardProps {
    data: ICommentData;
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
    const [isLike, setIsLike] = useState(false);
    console.log(data);
    const handleIsLike = () => {
        setIsLike(!isLike);
    };
    return (
        <div className='comment-card'>
            <div className='comment-card-profile'>
                <FaCircleUser size={36} color={'#e8e8e8'} />
            </div>
            <div className='comment-card-center-area'>
                <div className='comment-card-comment'>
                    <Link to={`/user/${data.userId._id}`}>{data.userId.name}</Link>
                    {data.content}
                </div>
                <div className='comment-card-nav'>
                    <div className='comment-card-nav-btn'>7주</div>
                    <div className='comment-card-nav-btn'>좋아요 1개</div>
                    <div className='comment-card-nav-btn'>답글달기</div>
                </div>
            </div>

            <div className='comment-card-like'>
                {isLike ? <FaHeart onClick={handleIsLike} /> : <FaRegHeart onClick={handleIsLike} />}
            </div>
        </div>
    );
};

export default CommentCard;
