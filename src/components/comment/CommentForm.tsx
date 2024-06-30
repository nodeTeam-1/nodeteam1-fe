/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaCircleUser } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useCommentStore } from '../../store/commentStroe';
import { useCommentRegister, useReplyCommentRegister } from '../../hooks/useCommentHook';
import { getMyProfileQuery } from '../../hooks/useProfileHook';
import './comment.scss';

interface ICommentFormInput {
    comment: string;
}

const CommentForm: React.FC = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset, watch, setValue } = useForm<ICommentFormInput>();
    const { commentId, userName: targetUser, reset: targetReset } = useCommentStore();
    const { mutate: replyRegister } = useReplyCommentRegister(id ?? '');
    const { mutate: commentRegister } = useCommentRegister(id ?? '');
    const { data: profileResponse } = getMyProfileQuery();

    const commentValue = watch('comment', '');

    console.log(`profileResponse: `, profileResponse);

    useEffect(() => {
        autoResizeTextarea();
    }, [commentValue]);

    useEffect(() => {
        if (targetUser) {
            setValue('comment', `@${targetUser} `);
        }
    }, [targetUser, setValue]);

    const onSubmit: SubmitHandler<ICommentFormInput> = ({ comment }) => {
        targetUser
            ? replyRegister({ commentId, message: comment.replace(`@${targetUser}`, '') })
            : commentRegister({ postId: id!, message: comment });
        reset(); // 제출 후 폼 초기화
        targetReset();
    };

    const autoResizeTextarea = () => {
        const textarea: HTMLTextAreaElement = document.getElementById('comment') as HTMLTextAreaElement;

        if (textarea) {
            textarea.style.height = '40px';
            const height = textarea.scrollHeight; // 높이
            if (height + 8 >= 88) return (textarea.style.height = `${88}px`);
            textarea.style.height = `${height + 8}px`;
        }
    };

    const handleResetComment = () => {
        targetReset();
        setValue('comment', ``);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container form-wrapper'>
            <div className='form-inner-section'>
                <div className='comment-card-profile'>
                    {profileResponse?.data.user.profileImage ? (
                        <img src={profileResponse?.data.user.profileImage} />
                    ) : (
                        <FaCircleUser size={36} color={'#e8e8e8'} />
                    )}
                </div>
                <div className='form-middle-area'>
                    {targetUser && (
                        <div className='form-middle-reply'>
                            {targetUser} 님에게 답글 남기는 중 <IoClose size={16} onClick={handleResetComment} />
                        </div>
                    )}
                    <textarea
                        id='comment'
                        {...register('comment', { required: '댓글이 입력되지 않았습니다.' })}
                        placeholder='댓글 달기...'
                    />
                </div>
                <div className='form-textarea-submit-area'>
                    {commentValue && (
                        <button type='submit' className='form-textarea-submit'>
                            게시
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
