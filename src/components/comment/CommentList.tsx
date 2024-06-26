/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './comment.scss';
import { ICommentData } from './comment.type';

interface CommentListProps {
    comments: ICommentData[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    console.log(comments);
    return <div className='comment-list'></div>;
};

export default CommentList;
