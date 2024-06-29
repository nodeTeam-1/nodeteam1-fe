/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './comment.scss';
import { ICommentData } from './comment.type';
import data from './dummy/dummyList.json';

const CommnetContainer: React.FC = () => {
    const commentData = data.dummyList as ICommentData[];

    return (
        <div className='comment-container'>
            <CommentList comments={commentData} />
            <CommentForm />
        </div>
    );
};

export default CommnetContainer;
