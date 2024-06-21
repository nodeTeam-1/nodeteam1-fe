import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './comment.scss';

const CommnetContainer: React.FC = () => {
    const [comments, setComments] = useState<string[]>([]);

    const handleAddComment = (comment: string) => {
        setComments([...comments, comment]);
    };

    return (
        <div className='comment-container'>
            <CommentForm onAddComment={handleAddComment} />
            <CommentList comments={comments} />
        </div>
    );
};

export default CommnetContainer;
