/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './comment.scss';
import { ICommentData, ICreateComment } from './comment.type';
import data from './dummy/dummyList.json';

const CommnetContainer: React.FC = () => {
    const commentData = data.dummyList as ICommentData[];

    const handleAddComment = (comment: ICreateComment) => {
        console.log(`comment: ${comment}`);
    };

    return (
        <div className='comment-container'>
            <CommentList comments={commentData} />
            <CommentForm onAddComment={handleAddComment} />
        </div>
    );
};

export default CommnetContainer;
