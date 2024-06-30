/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ICommentData } from './comment.type';
import { getTimeSince } from '../../utils/common/getTimeSice';
import { useCommentStore } from '../../store/commentStroe';
import { getMyProfileQuery } from '../../hooks/useProfileHook';
import './comment.scss';

interface CommentCardProps {
    data: ICommentData;
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
    const [isOpenReply, setIsOpenReply] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const { setTarget } = useCommentStore();
    const handleIsLike = () => {
        setIsLike(!isLike);
    };

    return (
        <div className='comment-card'>
            <div className='comment-card-profile'>
                {data.userId.profileImage ? (
                    <img src={data.userId.profileImage} />
                ) : (
                    <FaCircleUser size={36} color={'#e8e8e8'} />
                )}
            </div>
            <div className='comment-card-center-area'>
                <div className='comment-card-comment'>
                    <Link to={`/user/${data.userId._id}`}>{data.userId.name}</Link>
                    {data.message}
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
                {data.replies.length !== 0 && (
                    <div className='comment-reply-area'>
                        <div
                            onClick={() => {
                                setIsOpenReply((pre) => !pre);
                            }}>
                            {isOpenReply ? '답글 모두 숨기기' : `답글 ${data.replies.length}개 보기`}
                        </div>
                        <div>
                            {isOpenReply &&
                                data.replies.map((reply) => (
                                    <div className='comment-card' key={reply.userId + String(reply.createdAt)}>
                                        <div className='comment-card-profile'>
                                            {reply.userId.profileImage !== '' ? (
                                                <img src={reply.userId.profileImage} />
                                            ) : (
                                                <FaCircleUser size={36} color={'#e8e8e8'} />
                                            )}
                                        </div>
                                        <div className='comment-card-center-area'>
                                            <div className='comment-card-comment'>
                                                <Link to={`/user/${data.userId._id}`}>{data.userId.name}</Link>
                                                {reply.message}
                                            </div>
                                            <div className='comment-card-nav'>
                                                <div className='comment-card-nav-btn'>
                                                    {getTimeSince(new Date(String(reply.createdAt)))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='comment-card-like'>
                {isLike ? <FaHeart onClick={handleIsLike} /> : <FaRegHeart onClick={handleIsLike} />}
            </div>
        </div>
    );
};

export default CommentCard;
