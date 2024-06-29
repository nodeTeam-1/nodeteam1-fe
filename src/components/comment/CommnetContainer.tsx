/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { ICommentData } from './comment.type';
import { useGetComment } from '../../hooks/useCommentHook';
import data from './dummy/dummyList.json';
import './comment.scss';

const CommnetContainer: React.FC = () => {
    const commentData = data.dummyList as ICommentData[];
    const { id } = useParams();
    const { data: commentList } = useGetComment(id ?? '');

    return (
        <div className='comment-container'>
            {/* <CommentList comments={commentList ?? []} /> */}
            <CommentList comments={commentData} />
            <CommentForm />
        </div>
    );
};

export default CommnetContainer;
