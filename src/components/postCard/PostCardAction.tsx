import React, { useState } from 'react';
import './postCard.scss';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { MdOutlineSend } from 'react-icons/md';
import { MdOutlineInsertComment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface PostActionProps {
    userId: string;
    likeCount: number;
    onClick?: () => void; // Optional onClick prop
}

const postCardAction: React.FC<PostActionProps> = ({ userId, likeCount, onClick }) => {
    const navigate = useNavigate();
    const [heartState, setHreatState] = useState<boolean>(false);

    return (
        <ul className='user-action-list'>
            <li className='user-action like' onClick={() => setHreatState(!heartState)}>
                <span>{likeCount}</span>
                {heartState ? <IoMdHeart /> : <IoMdHeartEmpty />}
            </li>
            <li className='user-action share' onClick={() => navigate(`/dm/${userId}`)}>
                <MdOutlineSend />
            </li>
            <li className='user-action comment' onClick={onClick}>
                <MdOutlineInsertComment />
            </li>
        </ul>
    );
};

export default postCardAction;
