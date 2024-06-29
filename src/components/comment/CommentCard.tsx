/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ICommentData } from './comment.type';
import { getTimeSince } from '../../utils/common/getTimeSice';
import { useCommentStore } from '../../store/commentStroe';
import './comment.scss';

interface CommentCardProps {
    data: ICommentData;
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
    const [isLike, setIsLike] = useState(false);
    const { setTarget } = useCommentStore();
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
                    <div className='comment-card-nav-btn'>{getTimeSince(new Date(String(data.createdAt)))}</div>
                    <div className='comment-card-nav-btn'>좋아요 {data.likeCount}개</div>
                    <div
                        className='comment-card-nav-btn'
                        onClick={() =>
                            setTarget({ userId: data.userId._id, userName: data.userId.name, commentId: data._id })
                        }>
                        답글달기
                    </div>
                </div>
            </div>

            <div className='comment-card-like'>
                {isLike ? <FaHeart onClick={handleIsLike} /> : <FaRegHeart onClick={handleIsLike} />}
            </div>
        </div>
    );
};

export default CommentCard;
