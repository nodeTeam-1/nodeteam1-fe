import React from 'react';
import './postCard.scss';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { MdOutlineSend } from 'react-icons/md';
import { MdOutlineInsertComment } from 'react-icons/md';

interface PostActionProps {
    likeCount: number;
}

const postCardAction: React.FC<PostActionProps> = ({ likeCount }) => {
    return (
        <ul className='user-action-list'>
            <li className='user-action like'>
                <span>{likeCount}</span>
                <IoMdHeartEmpty />
                <IoMdHeart />
            </li>
            <li className='user-action share'>
                <MdOutlineSend />
            </li>
            <li className='user-action comment'>
                <MdOutlineInsertComment />
            </li>
        </ul>
    );
};

export default postCardAction;
