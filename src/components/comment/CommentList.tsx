/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import CommentCard from './CommentCard';
import { ICommentData } from './comment.type';
import './comment.scss';

interface CommentListProps {
    comments: ICommentData[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    console.log(comments);
    return (
        <div className='comment-list'>
            {comments.map((data) => (
                <CommentCard data={data} key={data._id} />
            ))}
        </div>
    );
};

export default CommentList;
