import React, { useState } from 'react';
import './postCard.scss';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { MdOutlineSend } from 'react-icons/md';
import { MdOutlineInsertComment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { createPostLikeMutation, deletePostLikeMutation } from '../../hooks/usePostHook';
import { useUserStore } from '../../store/userStore';

interface PostActionProps {
    postId: string;
    postUserId: string;
    likeCount: number;
    onClick?: () => void; // Optional onClick prop
    refetch?: () => void;
}

const postCardAction: React.FC<PostActionProps> = ({ postId, postUserId, likeCount, onClick, refetch }) => {
    const navigate = useNavigate();
    const { postLike } = useUserStore();
    const [heartState, setHreatState] = useState<boolean>(postLike.includes(postId));

    const voidfunc = () => {};
    const createLikeMutation = createPostLikeMutation(postId, refetch || voidfunc);
    const deleteLikeMutation = deletePostLikeMutation(postId, refetch || voidfunc);

    const heartClick = () => {
        setHreatState(!heartState);
        if (heartState) {
            deleteLikeMutation.mutate();
        } else {
            createLikeMutation.mutate();
        }
    };

    return (
        <ul className='user-action-list'>
            <li className='user-action like' onClick={() => heartClick()}>
                <span>{likeCount}</span>
                {heartState ? <IoMdHeart /> : <IoMdHeartEmpty />}
            </li>
            <li className='user-action share' onClick={() => navigate(`/dm/${postUserId}`)}>
                <MdOutlineSend />
            </li>
            <li className='user-action comment' onClick={onClick}>
                <MdOutlineInsertComment />
            </li>
        </ul>
    );
};

export default postCardAction;
