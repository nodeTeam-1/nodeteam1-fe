import React from 'react';
import './comment.scss';

interface CommentListProps {
    comments: string[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div className='comment-list'>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
